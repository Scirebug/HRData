import * as d3 from "d3";
import { createTooltipGroup, onMouseover, onMouseOut } from "./tooltipFunctions";

import d3Gradient from "./d3Gradient";
// import d3Responsivefy from './d3Responsivefy';

/**
 * @param {SvgInHtml} container - ref to SVG element
 * @param {Array} data - Array of objects, main data
 * @param {object} axis - The X and Y axis names from inside the data object keys e.g. data[axis.x] is same as data['date'] or data.date
 * @param {object} margin - Contains top, right, bottom and left margins as keys
 * @param {object} color - Contains text, grid, gradientOne, gradientTwo, lineMain, lineOne as keys
 */

const d3LineGraph = (container, data, axis, margin, color) => {
  if (!data) return;

  const cwidth = container.clientWidth;
  const cheight = container.clientHeight;

  /** d3 margin convention */
  const width = cwidth - margin.left - margin.right;
  const height = cheight - margin.top - margin.bottom;

  const svg = d3.select(container);
  // Remove old graph before adding new one
  svg.selectAll("g").remove();

  const chartGroup = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  chartGroup
    .attr("class", "d3-svg-salary")
    .style("opacity", 1)
    .style("font-family", "Inter");
  // .call(d3Responsivefy) // Make it responsive, requires the svg as prop but using D3 .call function already supplies it
  // .on("pointerenter pointermove", pointermoved)
  // .on("pointerleave", pointerleft);

  // Add defs and call gradient
  chartGroup.append("defs");
  d3Gradient(chartGroup, color);

  // Add X axis function
  const x = d3
    .scalePoint()
    .domain(data[axis.xa].map((d) => d[axis.x]))
    .range([0, width]);

  //   // X scale
  chartGroup
    .append("g")
    .attr("class", "xAxis") // Set the class
    .attr("transform", `translate(0,  ${height + 15})`) // Ofset the names from the graph
    // .style('display', 'none')
    .call(d3.axisBottom(x).tickSizeOuter(0).tickSizeInner(0)) // Call X axis with data, remove the vertical lines
    .call((g) =>
      g
        .select(".domain")
        .attr("transform", "translate(0,  -15)")
        .style("color", color.grid)
    ); // Change the bottom line

  //   // Add Y axis function
  const y = d3
    .scaleLinear()
    .domain(d3.extent(data[axis.y], (d) => d))
    .range([height, 0]);

  const formatThousand = d3.format(",");

  // Y scale
  chartGroup
    .append("g")
    .attr("class", "yAxis") // Set the class
    .attr("transform", "translate(-5,0)")
    .style("font-size", "10px")
    .call(
      d3
        .axisLeft(y) // Call the Y axis
        .ticks(data[axis.y].length) // How many values on Y axis
        .tickSizeOuter(0) // Remove the outer lines
        .tickSizeInner(0) // Remove the inner lines
        .tickFormat((d) => "£" + formatThousand(d)) // Add Pound symbol to each tick and format with comma every thousand
        .tickValues(data[axis.y].map((d) => d)) // Set custom tick values
    )
    .call((g) => g.select(".domain").remove()); // Remove the vertical lines

  chartGroup
    .append("clipPath")
    .attr("id", "clippath") // <-- we need to use the ID of clipPath
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "blue");

  //   // Add horizontal dashed grid lines
  chartGroup
    .selectAll("g.yAxis g.tick")
    .append("line")
    .attr("class", "gridline")
    .attr("x1", margin.right - 10) // Margin from left
    .attr("y1", 0)
    .attr("x2", width + 5) // Width of the graph
    .attr("y2", 0)
    .attr("stroke", color.grid) // Line color
    .attr("stroke-dasharray", "2"); // Make it dashed;

  //   // Add the area
  chartGroup
    .append("path")
    .datum(data[axis.xa])
    .attr("class", "area")
    .attr("fill", "url(#gradient)") // Match the ID in gradient function to add it
    .attr("stroke", "none")
    .attr(
      "d",
      d3
        .area()
        .x((d) => x(d[axis.x]))
        .y0(height)
        .y1((d) => y(d[axis.ya]))
    );

  chartGroup.selectAll("text").style("fill", color.text);

  //   // Add the line
  chartGroup
    .append("path")
    .datum(data[axis.xa])
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", color.lineMain)
    .attr("stroke-width", 1)
    .attr(
      "d",
      d3
        .line()
        .x((d) => x(d[axis.x]))
        .y((d) => y(d[axis.ya]))
    );

  //   // Add the trend line
  if (data.regressionLine) {
    chartGroup
      .append("path")
      .datum(data.regressionLine.data)
      .attr("class", "trend-line")
      .attr("fill", "none")
      .attr("stroke", color.lineMain)
      .attr("stroke-dasharray", "6")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(d[axis.x]))
          .y((d) => y(d[axis.ya]))
      )
      .attr("clip-path", "url(#clippath)");
  }

  const tick = chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr("class", "hover-ticks")
    .call(d3.axisBottom(x).tickSizeOuter(0).tickSizeInner(0))
    .call((g) => g.select("path").remove())
    .selectAll(".hover-ticks .tick")
    .style("transition", ".2s");

  tick
    .select("text")
    .style("font-size", "10px")
    .style("color", color.text)
    .attr("class", "xText")
    .attr("y", 18);

  tick
    .selectAll("line")
    .attr("stroke-dasharray", `3, 3`)
    .attr("stroke", color.lineMain)
    .attr("stroke-width", 1)
    .attr("y2", `-${height}px`)
    .style("opacity", 0);

  tick
    .append("rect")
    .attr("width", `${width / 12}px`)
    .attr("x", `-${width / 24}px`)
    .attr("y", `-${height}px`)
    .attr("height", `${height}px`)
    .style("fill", "transparent");

  d3.selectAll(".tick")
    .filter(":first-child")
    .select("rect")
    .attr("width", `${width / 12 / 2}px`)
    .attr("x", `0px`);

  d3.selectAll(".tick")
    .filter(":last-child")
    .select("rect")
    .attr("width", `${width / 12 / 2}px`)
    .attr("x", `-${width / 12 / 2}px`);

  //   // Add the circles
  chartGroup
    .append("g")
    .attr("class", "circles")
    .selectAll("circles")
    .data(data[axis.xa])
    .join("g")
    .attr("class", "g-circle")
    .append("circle")
    .attr("class", "circle")
    .attr("stroke", "none")
    .attr("fill", color.lineMain)
    .attr("cx", (d) => x(d[axis.x]))
    .attr("cy", (d) => y(d[axis.ya]))
    .attr("r", "4px");

  //   // Hover state on ticks
  tick
    .on("mouseout", () => {
      d3.selectAll(".hover-ticks .tick").selectAll("line").style("opacity", 0);

      d3.selectAll(".tick")
        .selectAll(".xText")
        .style("color", color.text)
        .style("font-weight", "400");
    })
    .on("mouseover", () => {
      d3.selectAll(".tick")
        .filter(":hover")
        .selectAll("line")
        .style("opacity", 1);

      d3.selectAll(".tick")
        .filter(":hover")
        .selectAll(".xText")
        .style("color", color.lineMain)
        .style("font-weight", "600");
    });

  //   // Hover state on circles
  chartGroup
    .selectAll(".g-circle")
    .on("mouseout", function () {
      d3.selectAll(".circle").attr("r", "4px");

      d3.select(this).selectAll(".hover-line").style("opacity", 0);

      d3.selectAll(".tick").selectAll("line").style("opacity", 0);

      d3.selectAll(".tick")
        .selectAll(".xText")
        .style("color", color.text)
        .style("font-weight", "400");

      onMouseOut(chartGroup);
    })
    .on("mouseover", function (event, d) {

  
      onMouseover(event.x, event.y, d, chartGroup, width, margin);

      d3.selectAll(".circle").filter(":hover").attr("r", "8px");

      d3.select(this).selectAll(".hover-line").style("opacity", 1);

      const e = chartGroup.selectAll(".g-circle").nodes();
      const i = e.indexOf(this);

      tick
        .filter((_, j) => [i].includes(j))
        .select("line")
        .style("opacity", 1);

      tick
        .filter((_, j) => [i].includes(j))
        .select("text")
        .style("color", color.lineMain)
        .style("font-weight", "600");
    });

  //   // Create the tooltip container.
  // const tooltip = chartGroup.append("g").attr("class", "tooltip");

  // Add the event listeners that show or hide the tooltip.
  // const bisect = d3.bisector((d) => d[axis.x]).center;

  // function pointermoved(event) {
  //   const i = bisect(data[axis.xa], x.invert(d3.pointer(event)[0]));
  //   console.log("i", i);

  //   tooltip.style("display", null);
  //   tooltip.attr(
  //     "transform",
  //     `translate(${x(data[i][axis.x])},${y(data[i][axis.y])})`
  //   );

  //   const path = tooltip
  //     .selectAll("path")
  //     .data(data)
  //     .join("path")
  //     .attr("fill", "white")
  //     .attr("stroke", "black");

  //   const text = tooltip
  //     .selectAll("text")
  //     .data(data)
  //     .join("text")
  //     .call((text) =>
  //       text
  //         .selectAll("tspan")
  //         .data([data[i][axis.x], data[i][axis.y]])
  //         .join("tspan")
  //         .attr("x", 0)
  //         .attr("y", (_, i) => `${i * 1.1}em`)
  //         .attr("font-weight", (_, i) => (i ? null : "bold"))
  //         .text((d) => d)
  //     );

  //   sizeFunc(text, path);
  // }

  // function pointerleft() {
  //   tooltip.style("display", "none");
  // }

  // // Wraps the text with a callout path of the correct size, as measured in the page.
  // function sizeFunc(text, path) {
  //   const { x, y, width: w, height: h } = text.node().getBBox();
  //   text.attr("transform", `translate(${-w / 2},${15 - y})`);
  //   path.attr(
  //     "d",
  //     `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
  //   );
  // }

  /////

  createTooltipGroup(chartGroup, d3);
};

export default d3LineGraph;
