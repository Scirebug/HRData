import React from "react";
import { StackedChart } from "../../charts/stacked/StackedChart";

export const StackedChartConfig = ({
  data,
  filter,
}) => {
  return (
    <StackedChart
      data={data}
      filter={filter}
    />
  );
};
