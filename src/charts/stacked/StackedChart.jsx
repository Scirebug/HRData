import React, { useEffect, useRef } from "react";
import { draw } from "./draw";

export const StackedChart = ({ data, filter }) => {
  const ref = useRef(null);

  const drawGraph = () => {
    draw(ref.current, data, filter);
  };
  useEffect(drawGraph, [data, filter]);

  return <svg ref={ref} width={filter.width} height={filter.height}></svg>;
};
