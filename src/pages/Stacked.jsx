import React, { useState } from "react";
import { PanelSelector } from "../components/PanelSelector";
import { StackedChartConfig } from "./stacked/StackedChartConfig";
import { StackedFilterPanel } from "./stacked/StackedFilterPanel";
import {config as stackedConfig} from "../charts/stacked/config";
import rawdata from "../data/stackedSample.json";

const panels = ["chart"];

export const Stacked = () => {
  const [panel, setPanel] = useState("chart");
  const [filter, setFilter] = useState({ containerwidth: 800, containerheight: 600 });

  const config = stackedConfig(filter)

  const ChoosePanel = (panel) => {
    switch (panel) {
      case "chart": {
        return <StackedFilterPanel filter={filter} setFilter={setFilter} />;
      }
      default:
        return null;
    }
  };

  return filter ? (
    <div
      style={{
        fontFamily: "Graphic",
        width: "100%",
        height: "100%",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              flex: 8,
              padding: 20,
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontFamily: "Graphic" }}>
              <StackedChartConfig data={rawdata} filter={config} />
            </div>
          </div>

          <div
            style={{
              flex: 3,
            }}
          >
            <div>
              <PanelSelector
                panel={panel}
                setPanel={setPanel}
                panels={panels}
                filter={filter}
                setFilter={setFilter}
                configId="ContextLoss"
              />
              {ChoosePanel(panel)}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
