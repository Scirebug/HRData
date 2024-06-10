import React, { useEffect, useRef } from "react";
import d3LineGraph from "./d3LineGraph"


export const LineChart = ({ data, filter }) => {
  const ref = useRef(null);

  const drawGraph = () => {
    d3LineGraph(ref.current, data, filter.axis,filter.margin,filter.color);
  };
  useEffect(drawGraph, [data, filter]);

  return <svg ref={ref} width={filter.size.width} height={filter.size.height}></svg>;
};
