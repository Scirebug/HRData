import * as d3 from "d3";

export function draw(container, data, config) {
  const {
    bars,
    x_axis,
    y_axis,
    gridlines,
    header,
    width: cwidth,
    height: cheight,
    layout,
    legend,
    series,
    svg: svgx,
    timeFormat,
    topLabel,
  } = config;

  const linesx = series
    .filter((filt) => {
      return !filt.clonedataindex;
    })
    .map((item, i) => {
      return { type: item.type, i };
    })
    .filter((item) => {
      return item.type === "line";
    })
    .map((item) => item.i);

  const barsx = series
    .map((item, i) => {
      return { type: item.type, i };
    })
    .filter((item) => {
      return item.type === "bar";
    })
    .map((item) => item.i);

  const formatteddata = data.map((d) => {
    if (x_axis.scale === "scaleTime") {
      return { date: d3.timeParse(timeFormat)(d.date), value: d.value };
    } else {
      return { date: d.date, value: d.value };
    }
  });

  const svg = d3.select(container);
  svg.selectAll("g").remove();
  /** d3 margin convention */
  const width = cwidth - layout.margin.left - layout.margin.right;
  const height = cheight - layout.margin.top - layout.margin.bottom;

  /** SVG Styles */
  svg.style("background-color", svgx.Background);
  svg.style("border", svgx.border);

  const headerGroup = svg
    .append("g")
    .attr("transform", "translate(" + 0 + "," + 0 + ")");

  if (topLabel) {
    const topLabelGroup = svg
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");
    topLabel.forEach((label, i) => {
      topLabelGroup
        .append("g")
        .attr(
          "transform",
          "translate(" +
            (label.left_right === "left"
              ? layout.margin.left + label.offset.x
              : layout.margin.left + width + label.offset.x) +
            "," +
            (layout.margin.top + label.offset.y) +
            ")"
        )
        .append("text")
        .attr("fill", label.color)
        .style("text-anchor", label.anchor)
        .style("font-size", label.fontSize)
        .style("font-weight", label.fontWeight)
        .text(label.text)
        .text(label.text);
    });
  }

  let legendGroup = {};
  if (legend) {
    legendGroup = svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          layout.margin.left +
          "," +
          (height + layout.margin.top + legend.marginTop) +
          ")"
      );
  }

  const axesGroup = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + layout.margin.left + "," + layout.margin.top + ")"
    );

  /** scales */
  let x = {};
  if (x_axis.scale === "scaleBand") {
    x = d3
      .scaleBand()
      .domain(
        formatteddata.map((d) => {
          return d.date;
        })
      )
      .range([0, width])
      .padding(bars && bars.padding ? bars.padding : 0);
  } else if (x_axis.scale === "scaleLinear") {
    x = d3
      .scaleLinear()
      .domain(
        formatteddata.map((d, i) => {
          return d.date;
        })
      )
      .range([0, width]);
  } else if (x_axis.scale === "scaleOrdinal") {
    x = d3
      .scaleOrdinal()
      .domain(
        formatteddata.map((d, i) => {
          return d.date;
        })
      )
      .range([0, width]);
  } else {
    x = d3
      .scaleTime()
      .domain(
        d3.extent(formatteddata, function (d) {
          return d.date;
        })
      )
      .range([0, width]);
  }

  const subgroups = bars?.subgroups;

  if (barsx.length > 0 && bars) {
    const groupGap = (bars.groupGap.factor * width) / bars.groupGap.denominator;
    var xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([
        0,
        x(formatteddata[1].date) - x(formatteddata[0].date) - groupGap,
      ])
      .padding(bars && bars.padding ? bars.padding : 0);
  }

  let translateChart;
  if (bars && bars.subgroups.length > 1 && bars.stacked === false) {
    translateChart = (xSubgroup.bandwidth() * bars.subgroups.length) / 2;
  } else if (bars && bars.subgroups.length > 0 && bars.stacked === false) {
    translateChart = x.bandwidth() / 2;
  } else {
    translateChart = 0;
  }

  const barGroup = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (layout.margin.left + translateChart) +
        "," +
        layout.margin.top +
        ")"
    );
  const lineGroup = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (layout.margin.left + translateChart) +
        "," +
        layout.margin.top +
        ")"
    );

  const xAxisGroup = axesGroup
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3
        .axisBottom(x)
        .tickSize(x_axis.ticks.size)
        .tickFormat(
          x_axis.scale === "scaleTime"
            ? x_axis.format
              ? d3.timeFormat(x_axis.format)
              : d3.timeFormat(timeFormat)
            : null
        )
    );

  /** Style the xAxis */
  xAxisGroup.selectAll("line").attr("stroke", x_axis.ticks.colour);
  xAxisGroup.selectAll(".domain").attr("stroke", x_axis.ticks.colour);
  xAxisGroup
    .selectAll("text")
    .attr("fill", x_axis.text.colour)
    .attr(
      "transform",
      `rotate(${x_axis.text.rotate}) translate(${x_axis.text.translate})`
    )
    .style("text-anchor", x_axis.text.anchor)
    .style("font-size", x_axis.fontSize.x);

  //add the header
  headerGroup
    .append("text")
    .attr("y", header.marginTop)
    .attr("x", cwidth / 2)
    .attr("fill", header.colour)
    .style("text-anchor", "middle")
    .style("font-size", header.fontSize)
    .style("font-weight", header.fontWeight)
    .text(header.text);

  if (legend && legend.items.length > 0) {
    const items = legend.items.length;
    const cols = legend.cols ? legend.cols : items;
    const legendItemWidth = width / cols;
    const rows = Math.ceil(items / cols);

    //add the legend
    let lineLegend = legendGroup
      .selectAll(".lineLegend")
      .data(legend.items)
      .enter()
      .append("g")
      .attr("class", "lineLegend")
      .attr("width", legendItemWidth);

    lineLegend
      .append("rect")
      .attr("fill", (d, i) => (d.color ? d.color : series[i].stroke))
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height);

    let totalboxwidth = 0;
    let startposition = 0;
    let widthused = 0;

    lineLegend
      .append("text")
      .text((d) => d.label)
      .attr("x", (d) => d.width + legend.gap)
      .attr("dy", legend.text_dy)
      .style("font-size", (d) => d.fontSize);

    lineLegend.each(function (g) {
      const box = this.getBBox();
      totalboxwidth = totalboxwidth + box.width;
    });
    totalboxwidth = totalboxwidth / rows;
    lineLegend.attr("transform", function (d, i) {
      let offset = 0;
      const box = this.getBBox();
      if (i % cols === 0) {
        offset = 0;
        startposition =
          (width - totalboxwidth - (cols - 1) * legend.margin) / 2;
        widthused = 0;
      }
      offset = startposition + widthused;
      widthused = widthused + box.width + legend.margin;
      const verticaloffset = Math.floor((i * rows) / items) * 20;
      return "translate(" + offset + "," + verticaloffset + ")";
    });
  }

  let yAxis = {};
  let yAxisGroup = {};
  let y = {};

  for (let i = 0; i < y_axis.length; i++) {
    const y_axis_style = y_axis[i];
    const isPercentage = y_axis_style.format.includes("%");
    const format = d3.format(y_axis_style.format);
    const reformat = (fy) => fy.split(",").join(" ");

    const valueArray = [];
    formatteddata.forEach((item) => {
      item.value.forEach((v, index) => {
        if (v || v === 0) {
          if (y_axis_style.childrenIndexes.indexOf(index) >= 0) {
            valueArray.push(+v);
          }
        }
      });
    });

    y[i] = d3
      .scaleLinear()
      .domain([
        y_axis_style.domain && !isNaN(y_axis_style.domain.min)
          ? y_axis_style.domain.min
          : d3.min(valueArray),
        y_axis_style.domain && !isNaN(y_axis_style.domain.max)
          ? y_axis_style.domain.max
          : d3.max(valueArray),
      ])
      .range([
        y_axis_style.range && !isNaN(y_axis_style.range.from)
          ? y_axis_style.range.from
          : height,
        y_axis_style.range && !isNaN(y_axis_style.range.to)
          ? y_axis_style.range.to
          : 0,
      ]);
    if (y_axis_style.invisible) {
      //do nothing
    } else {
      if (y_axis_style.left_right === "left") {
        yAxis[i] = d3
          .axisLeft(y[i])
          .tickSize(6)
          // .tickFormat();
          .tickFormat((x) =>
            isPercentage ? format(x / 100) : reformat(format(x))
          );
        yAxisGroup[i] = axesGroup.append("g").call(yAxis[i]);
        yAxisGroup[i].attr(
          "transform",
          "translate(" + -y_axis_style.margin + "," + 0 + ")"
        );
      } else {
        yAxis[i] = d3
          .axisRight(y[i])
          .tickSize(6)
          .tickFormat((x) =>
            isPercentage ? format(x / 100) : reformat(format(x))
          );
        yAxisGroup[i] = axesGroup.append("g").call(yAxis[i]);
        yAxisGroup[i].attr(
          "transform",
          "translate(" + (width + y_axis_style.margin) + "," + 0 + ")"
        );
      }

      /** Style the y axis */
      yAxisGroup[i]
        .selectAll("line")
        .style("stroke", y_axis_style.ticks.colour);
      yAxisGroup[i]
        .selectAll(".domain")
        .attr("stroke", y_axis_style.ticks.colour);
      yAxisGroup[i]
        .selectAll("text")
        .attr("fill", y_axis_style.text.colour)
        .style("font-size", y_axis_style.fontSize.y);
    }
  }
  /** yAxis2 is for gridlines */
  const yAxis2 = d3
    .axisLeft(y[0])
    .tickSizeInner(-width)
    .tickSizeOuter(0)
    .tickFormat("");

  const gridlineGroup = axesGroup.append("g").call(yAxis2);
  /** style the gridlines */
  gridlineGroup.selectAll("line").style("stroke", gridlines.colour);
  gridlineGroup.selectAll(".domain").attr("stroke", "transparent");

  if (linesx.length > 0) {
    const linedata = formatteddata.map((item) => {
      return {
        date: item.date,
        value: item.value.filter((val, i) => {
          return linesx.includes(i);
        }),
      };
    });

    const lineseries = series
      .map((item, i) => {
        return { ...item, i: i };
      })
      .filter((fil) => fil.type === "line");

    for (let j = 0; j < lineseries.length; j++) {
      const line_style = lineseries[j];
      let k = j;

      if (line_style.clonedataindex) {
        for (let x = 0; x < lineseries.length; x++) {
          if (lineseries[x].i === line_style.clonedataindex) {
            k = x;
            break;
          }
        }
      }

      // Add the line
      lineGroup
        .append("path")
        .datum(
          linedata.filter((item) => {
            if (line_style.filter) {
              return line_style.filter(item);
            } else return true;
          })
        )
        .attr("fill", "none")
        .attr("stroke", (d) => {
          return line_style.stroke;
        })
        .attr("stroke-width", line_style.strokeWidth)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y[line_style.yAxis](d.value[k]);
            })
            .curve(d3[line_style.curve ? line_style.curve : "curveLinear"])
            .defined(function (d) {
              return line_style.ignoreUndefined ? d.value[k] : true;
            })
        );
      if (line_style.shape) {
        if (line_style.shape.type === "circle") {
          lineGroup
            .selectAll("myCircles")
            .data(linedata)
            .enter()
            .append("circle")
            .attr("fill", line_style.shape.fill)
            .attr("stroke", line_style.shape.stroke)
            .attr("cx", function (d) {
              return x(d.date);
            })
            .attr("cy", function (d) {
              return y[line_style.yAxis](d.value[j]);
            })
            .attr("r", line_style.shape.size);
        }
        if (line_style.shape.type === "square") {
          lineGroup
            .selectAll("mySquares")
            .data(linedata)
            .enter()
            .append("rect")
            .attr("fill", line_style.shape.fill)
            .attr("stroke", line_style.shape.stroke)
            .attr("x", function (d) {
              return x(d.date) - line_style.shape.size / 2;
            })
            .attr("y", function (d) {
              return (
                y[line_style.yAxis](d.value[k]) - line_style.shape.size / 2
              );
            })
            .attr("width", line_style.shape.size)
            .attr("height", line_style.shape.size);
        }
      }
      if (line_style.labels) {
        const isPercentage = line_style.labels.format.includes("%");
        const format = d3.format(line_style.labels.format);
        const linelabelgroup = lineGroup
          .selectAll("labels")
          .data(linedata)
          .enter()
          .append("text")
          .text((d) =>
            isPercentage ? format(d.value[k] / 100) : format(d.value[k])
          )
          .style("text-anchor", "middle")
          .attr("x", (d) => x(d.date))
          .attr("y", function (d) {
            return y[line_style.yAxis](d.value[k]);
          })
          .style("font-size", line_style.labels.fontSize)
          .style("fill", line_style.labels.colour);

        linelabelgroup.attr(
          "transform",
          "translate(" +
            line_style.labels.offset.x +
            "," +
            line_style.labels.offset.y +
            ")"
        );
      }
    }
  }

  if (barsx.length > 0) {
    const bardata = formatteddata.map((item) => {
      return {
        date: item.date,
        value: item.value.filter((val, i) => {
          return barsx.includes(i);
        }),
      };
    });

    const barseries = series.filter((item) => item.type === "bar");

    const barstyles = {};
    subgroups.forEach((item, i) => {
      barstyles[item] = barseries[i];
    });
    const barseriesdata = [];
    bardata.forEach((item) => {
      let newitem = { date: item.date };
      item.value.forEach((val, i) => {
        newitem = { ...newitem, [subgroups[i]]: val };
      });
      barseriesdata.push(newitem);
    });

    if (bars.stacked) {
      var stackedData = d3.stack().keys(subgroups)(barseriesdata);
      let styles;
      barGroup
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter()
        .append("g")
        .attr("fill", function (d, i) {
          styles = barstyles[d.key];
          return styles.stroke;
          // color(d.key);
        })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function (d) {
          return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
          return x(d.data.date);
        })
        .attr("y", function (d) {
          // const styles = barstyles[d.key];
          return y[styles.yAxis](d[1]);
        })
        .attr("height", function (d) {
          // const styles = barstyles[d.key];
          return y[styles.yAxis](d[0]) - y[styles.yAxis](d[1]);
        })
        .attr("width", x.bandwidth());
    } else {
      barGroup
        .selectAll("g")
        .data(barseriesdata)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          const offset =
            barsx.length > 1
              ? x(d.date) - xSubgroup.bandwidth()
              : x(d.date) - x.bandwidth() / 2;
          return "translate(" + offset + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
          return subgroups.map(function (key) {
            return { key: key, value: d[key], date: d.date };
          });
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          if (barsx.length > 1) {
            return xSubgroup(d.key);
          } else return x(d.key);
        })
        .attr("y", function (d) {
          if (d.value) {
            const styles = barstyles[d.key];
            return y[styles.yAxis](d.value);
          } else return 0;
        })
        .attr("width", function (d) {
          if (barsx.length > 1) {
            return xSubgroup.bandwidth();
          } else return x.bandwidth();
        })
        .attr("height", function (d) {
          if (d.value) {
            const styles = barstyles[d.key];
            return height - y[styles.yAxis](d.value);
          } else return 0;
        })
        .attr("fill", function (d) {
          const styles = barstyles[d.key];
          if (typeof styles.stroke === "string") {
            return styles.stroke;
          } else {
            return styles.stroke(d);
          }
        });
    }
  }
}
