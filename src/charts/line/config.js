export const config = (filter) => {
  return {
    axis: {
      x: "dateFormatted", // X axis labels
      xa: "dataSeries",
      y: "valueRange", // Y axis labels
      ya: "value", // Y axis values on graph
    },
    margin: { top: 32, right: 18, bottom: 33, left: 60 },
    size: {
      width: filter.containerWidth,// - margin.left - margin.right - 32,
      height: filter.containerHeight,// - margin.top - margin.bottom - 32 - 70,
    },
    color: {
      text: "#616161",
      grid: "e0e0e0",
      gradientOne: "#4A148C",
      gradientOneOpacity: 0.6,
      gradientTwo: "#301934",
      gradientTwoOpacity: 0.4,
      lineMain: "#000000",
      lineOne: "#000000", //colors.Dark_Purple1000,
    },
  };
};
