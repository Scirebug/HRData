import React, { useState } from "react";
import { PanelSelector } from "../components/PanelSelector";
import { LineChartConfig } from "./line/LineChartConfig";
import { LineFilterPanel } from "./line/LineFilterPanel";
import {config as lineConfig} from "../charts/line/config";
import rawdata from "../data/lineData.json";

const panels = ["chart"];

export const Line = () => {
  const [panel, setPanel] = useState("chart");
  const [filter, setFilter] = useState({ containerWidth: 800, containerHeight: 600 });

  const config = lineConfig(filter)

  const ChoosePanel = (panel) => {
    switch (panel) {
      case "chart": {
        return <LineFilterPanel filter={filter} setFilter={setFilter} />;
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
              <LineChartConfig data={rawdata} filter={config} />
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
