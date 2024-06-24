/*************HASH YOUR DATA FOR INSTANT ACCESS ON A KEY FROM DATA ARRAY **********/

const data = {
  "Jul 23": { upperQuartile: 71000, medianSalary: 58100, lowerQuartile: 49200 },
  "Aug 23": { upperQuartile: 71000, medianSalary: 58100, lowerQuartile: 49300 },
  "Sep 23": { upperQuartile: 71000, medianSalary: 58100, lowerQuartile: 49400 },
  "Oct 23": { upperQuartile: 71000, medianSalary: 58100, lowerQuartile: 49500 },
  "Nov 23": { upperQuartile: 71000, medianSalary: 58100, lowerQuartile: 49600 },
  "Dec 23": { upperQuartile: 71000, medianSalary: 58100, lowerQuartile: 49700 },
  "Jan 24": { upperQuartile: 71000, medianSalary: 58100, lowerQuartile: 49800 },
};

/**************PUT THIS CONFIG SOMEWHERE*****************/
const tooltips = {
  active: true,
  text: {
    label: { fontSize: 10, fontWeight: 600, color: "#000000" },
    content: { fontSize: 10, fontWeight: 400, color: "#000000" },
    seperator: { fontSize: 10, fontWeight: 400, color: "#000000" },
  },
  box: {
    width: 400,
    height: 100,
    fill: "#DFDFDF",
    stroke: "#000000",
    strokeWidth: 1,
    radius: 4,
  },
  triangle: {
    size: 64,
    marginTop: -1,
    mousetoboxgap: 20,
  },
  table: { padding: 4, border: "none", backgroundColor: "none" },
  tr: { seperator: ":" },
  td: {
    align: { label: "left", content: "left" },
    padding: {
      label: { left: 10, right: 5 },
      content: { left: 5, right: 10 },
    },
  },
  mouseOffset: { x: 20, y: 20 }, // For some reason the mouse is offset by 20. I don't understand why
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/***************YOU PROBABLY WANT TO MODIFY THIS FUNCTION TO INCLUDE THAT LITTLE ICON THING
 * IT IS AN HTML TABLE SO NICE TO STYLE.
 */

const appendLineTooltip = (tbody, tooltips, label, classx, barColours) => {
  const tr_line = tbody.append("xhtml:tr");
  const imagetd = tr_line.append("xhtml:td");

  const imageSvg = imagetd
    .append("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("viewBox", "0 0 10 10")
    .attr("height", 10)
    .attr("width", 10);

  imageSvg
    .append("path")
    .attr("fillRule", "evenodd")
    .attr("clipRule", "evenodd")
    .attr(
      "d",
      "M0 8.45235C0 7.99211 0.295197 7.61902 0.659341 7.61902H5.05495C5.41909 7.61902 5.71429 7.99211 5.71429 8.45235C5.71429 8.91259 5.41909 9.28569 5.05495 9.28569H0.659341C0.295197 9.28569 0 8.91259 0 8.45235Z"
    )
    .attr("fill", barColours[0]);

  imageSvg
    .append("path")
    .attr("fillRule", "evenodd")
    .attr("clipRule", "evenodd")
    .attr(
      "d",
      "M2.14307 4.99999C2.14307 4.53975 2.43826 4.16666 2.80241 4.16666H7.19801C7.56216 4.16666 7.85735 4.53975 7.85735 4.99999C7.85735 5.46023 7.56216 5.83332 7.19801 5.83332H2.80241C2.43826 5.83332 2.14307 5.46023 2.14307 4.99999Z"
    )
    .attr("fill", barColours[1]);

  imageSvg
    .append("path")
    .attr("fillRule", "evenodd")
    .attr("clipRule", "evenodd")
    .attr(
      "d",
      "M4.28564 1.54763C4.28564 1.08739 4.58084 0.714294 4.94499 0.714294H9.34059C9.70473 0.714294 9.99993 1.08739 9.99993 1.54763C9.99993 2.00786 9.70473 2.38096 9.34059 2.38096H4.94499C4.58084 2.38096 4.28564 2.00786 4.28564 1.54763Z"
    )
    .attr("fill", barColours[2]);

  tr_line
    .append("xhtml:td")
    .style("text-align", tooltips.td.align.label)
    .style("color", tooltips.text.label.color)
    .style("font-size", `${tooltips.text.label.fontSize}px`)
    .style("font-weight", tooltips.text.label.fontWeight)
    .style("padding-left", `${tooltips.td.padding.label.left}px`)
    .style("padding-right", `${tooltips.td.padding.label.right}px`)
    .html(label);
  tr_line
    .append("xhtml:td")
    .style("color", tooltips.text.seperator.color)
    .style("font-size", `${tooltips.text.seperator.fontSize}px`)
    .style("font-weight", tooltips.text.seperator.fontWeight)
    .html(tooltips.tr.seperator);
  tr_line
    .append("xhtml:td")
    .style("text-align", tooltips.td.align.content)
    .style("color", tooltips.text.content.color)
    .style("font-size", `${tooltips.text.content.fontSize}px`)
    .style("font-weight", tooltips.text.content.fontWeight)
    .style("padding-left", `${tooltips.td.padding.content.left}px`)
    .style("padding-right", `${tooltips.td.padding.content.right}px`)
    .attr("class", classx)
    .html("");
};

export const onMouseOut = (chartGroup) => {
  const tooltipgroup = chartGroup.select(".tooltip-group");
  const tooltiparrow = chartGroup.select(".tooltip-arrow-group");

  tooltipgroup.selectAll("circle").remove();

  tooltipgroup.style("display", "none");
  tooltiparrow.style("display", "none");
};

export const onMouseover = (x, y, d, chartGroup, width, margin) => {
  console.log("d", d);
  const tooltipgroup = chartGroup.select(".tooltip-group");

  x = x - margin.left - tooltips.mouseOffset.x;
  y = y - margin.top - tooltips.mouseOffset.y;

  const tooltiparrow = chartGroup.select(".tooltip-arrow-group");

  /**************GET YOUR HASHED DATA FROM THE KEY ***************/
  tooltipgroup.style("display", "block");
  tooltipgroup
    .select(".table-upper-quartile")
    .html(`&pound${numberWithCommas(data[d.dateFormatted].upperQuartile)}`);
  tooltipgroup
    .select(".table-median-salary")
    .html(`&pound${numberWithCommas(data[d.dateFormatted].medianSalary)}`);
  tooltipgroup
    .select(".table-lower-quartile")
    .html(`&pound${numberWithCommas(data[d.dateFormatted].lowerQuartile)}`);

  /********THE DIV WILL CHANGE SIZE DEPENDIGN ON WHAT YOU PUT IN IT SO FIRST
   * GET THE DIMENSIONS
   */
  const pdiv = tooltipgroup.select(".parentdiv").node();
  const pdivwidth = pdiv.getBoundingClientRect().width;
  const pdivheight = pdiv.getBoundingClientRect().height;

  /*********CALCULATE THE OFFSETS OF THE TOOLTIP DEPENDING ON WHERE THE MOUSE IS
   * CLICKED
   */

  const xw = tooltips.box.width - pdivwidth;

  const tx = x - tooltips.box.width / 2;
  const ctx = x - pdivwidth / 2;
  const ty = y - tooltips.box.height - tooltips.triangle.mousetoboxgap;

  const ctp = tx + xw / 2;

  const allowedwidth = width - pdivwidth;
  const xdiff =
    ctp < 0
      ? ctp * -1 - margin.left / 2
      : ctx > allowedwidth
      ? allowedwidth - tx - xw / 2 + margin.right / 2
      : 0;

  const ydiff = tooltips.box.height - pdivheight;

  tooltipgroup.attr(
    "transform",
    "translate(" + (tx + xdiff) + "," + (ty + ydiff) + ")"
  );

  tooltiparrow
    .style("display", "block")
    .attr("transform", "translate(" + tx + "," + ty + ")");
};

export const createTooltipGroup = (chartGroup, d3) => {
  const tooltiparrow = chartGroup
    .append("g")
    .attr("class", "tooltip-arrow-group")
    .style("display", "none");
  const tooltipgroup = chartGroup
    .append("g")
    .attr("class", "tooltip-group")
    .style("display", "none");

  const foreignObject = tooltipgroup
    .append("foreignObject")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", tooltips.box.width)
    .attr("height", tooltips.box.height)
    .style("pointer-events", "none");

  const aparentdiv = foreignObject
    .append("xhtml:div")
    .style("display", "flex")
    .style("justify-content", "center");

  const parentdiv = aparentdiv
    .append("xhtml:div")
    .attr("class", "parentdiv")
    .style("height", "100%")
    .style("display", "inline-block")
    .style("justify-content", "center")
    .style("background-color", tooltips.box.fill)
    .style("border-radius", tooltips.box.radius + "px")
    .style(
      "border",
      `${tooltips.box.strokeWidth}px solid ${tooltips.box.stroke}`
    )
    .style("padding", `${tooltips.table.padding}px`);

  const table = parentdiv
    .append("xhtml:table")
    .style("background-color", tooltips.table.backgroundColor)
    .style("border-collapse", "collapse")
    .style("border", tooltips.table.border);
  const tbody = table.append("xhtml:tbody");

  appendLineTooltip(tbody, tooltips, "Upper Quartile", "table-upper-quartile", [
    "#C9B2D9",
    "#C9B2D9",
    "#4B0082",
  ]);
  appendLineTooltip(tbody, tooltips, "Median Salary", "table-median-salary", [
    "#C9B2D9",
    "#4B0082",
    "#C9B2D9",
  ]);
  appendLineTooltip(tbody, tooltips, "Lower Quartile", "table-lower-quartile", [
    "#4B0082",
    "#C9B2D9",
    "#C9B2D9",
  ]);

  /*****************IF YOU HAVE A BORDER THEN THE ARROW WILL ALWAYS APPEAR WITH THE UNWANTED LINE
   * ON TOP OF THE TRIANGLE. YOU COULD:
   * 1. NOT HAVE A BORDER
   * 2. REMOVE THE ARROW
   * 3. CREATE AN SVG PATH BUT I THINK THIS WOULD GET COMPLICATED.
   */

  tooltiparrow
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolTriangle).size(tooltips.triangle.size))
    .attr("fill", tooltips.box.fill)

    .style("stroke", tooltips.box.stroke)
    .style("stroke-width", tooltips.box.strokeWidth)
    .attr(
      "transform",
      "translate(" +
        tooltips.box.width / 2 +
        "," +
        (tooltips.box.height + tooltips.triangle.marginTop) +
        ")rotate(180)"
    );
};
