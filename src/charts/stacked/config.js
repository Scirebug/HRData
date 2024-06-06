export const config = (filter) => {
  return {
    x_axis: {
      text: {
        colour: "#000000",
        rotate: "0",
        translate: "0",
        anchor: "center",
      },
      ticks: { colour: "#000000", size: 10 },
      fontSize: { x: 10, y: 10, labelx: 12, labely: 12 },
      scale: "scaleBand",
    },
    gridlines: {
      colour: "grey",
    },
    y_axis: [
      {
        left_right: "left",
        text: { colour: "#000000" },
        ticks: { colour: "#000000" },
        fontSize: { x: 10, y: 10, labelx: 12, labely: 12 },
        format: ",",
        childrenIndexes: [0, 1, 2, 3, 4, 5],
        domain: { min: 0, max: 80000000 },
        margin: 0,
      },
    ],
    header: {
      text: "Sales Trend USD",
      fontSize: 16,
      fontWeight: 600,
      colour: "#757575",
      marginTop: 30,
    },
    width: filter.containerwidth,
    height: filter.containerheight,
    layout: {
      margin: { top: 50, right: 30, bottom: 100, left: 80 },
    },
    legend: {
      marginTop: 40,
      text_dy: ".5em",
      margin: 30,
      gap: 10,
      cols: 2,
      items: [
        {
          label: "Star Light  Rice-100LBS (China)",
          fontSize: 12,
          width: 20,
          height: 4,
        },
        {
          label: "Supreme Rice - 50Kgs (India)",
          fontSize: 12,
          width: 20,
          height: 4,
        },
        {
          label: "Kingstar Rice-100LBS (Pakistan)",
          fontSize: 12,
          width: 20,
          height: 4,
        },
        {
          label: "Supreme Rice - 50Kgs (Thai)",
          fontSize: 12,
          width: 20,
          height: 4,
        },
        {
          label: "Ruby 100% Broken Rice -100LBS (Viet)",
          fontSize: 12,
          width: 20,
          height: 4,
        },
        {
          label: "Ruby Fragrant Rice - 100LBS (US)",
          fontSize: 12,
          width: 20,
          height: 4,
        },
      ],
    },
    series: [
      { type: "bar", stroke: "#FFFF00", strokeWidth: 4, yAxis: 0 },
      { type: "bar", stroke: "#ED7D31", strokeWidth: 4, yAxis: 0 },
      { type: "bar", stroke: "#9B96F8", strokeWidth: 4, yAxis: 0 },
      { type: "bar", stroke: "#C3EA62", strokeWidth: 4, yAxis: 0 },
      { type: "bar", stroke: "#BBFBF9", strokeWidth: 4, yAxis: 0 },
      { type: "bar", stroke: "#2E75B6", strokeWidth: 4, yAxis: 0 },
    ],
    bars: {
      stacked: true,
      subgroups: [
        "Star Light  Rice-100LBS (China)",
        "Supreme Rice - 50Kgs (India)",
        "Kingstar Rice-100LBS (Pakistan)",
        "Supreme Rice - 50Kgs (Thai)",
        "Ruby 100% Broken Rice -100LBS (Viet)",
        "Ruby Fragrant Rice - 100LBS (US)",
      ],
      groupGap: { factor: 10, denominator: 490 },
      padding: [0.5],
    },
    svg: { Background: "#ffffff", border: "none" },
    timeFormat: "%b-%y",
  };
};

