import React from "react";
import {LineChart} from "../../charts/line/LineChart";

export const LineChartConfig = ({
  data,
  filter,
}) => {

  return (
    <LineChart
      data={data}
      filter={filter}
    />
  );
};
