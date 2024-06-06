import React from "react";
import { ContextLossChart } from "../../charts/contextloss/ContextLossChart";

export const ContextLossChartConfig = ({
  data,
  filter,
}) => {
  return (
    <ContextLossChart
      data={data}
      filter={filter}
    />
  );
};
