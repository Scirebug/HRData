import React, { useState, useEffect } from "react";
import { PanelSelector } from "../components/PanelSelector";
import { ContextLossChartConfig } from "./contextloss/ContextLossChartConfig";
import { ContextLossFilterPanel } from "./contextloss/ContextLossFilterPanel";
import { ContextLossFilterPanelYaxis } from "./contextloss/ContextLossFilterPanelYaxis";
import { ContextLossFilterPanelXaxis } from "./contextloss/ContextLossFilterPanelXaxis";
import { ContextLossFilterPanelSlider } from "./contextloss/ContextLossFilterPanelSlider";
import { ContextLossFilterPanelLegend } from "./contextloss/ContextLossFilterPanelLegend";
import { getConfigs } from "../api/s3";
import rawdata from "../data/data_for_bruce.json";

const panels = ["chart", "y Axis", "x Axis", "slider", "legend"];

export const ContextLoss = ({ auth }) => {
  const [panel, setPanel] = useState("chart");
  const [filter, setFilter] = useState();

  useEffect(() => {
    // load default config
    const asyncfunction = async () => {
      const defConfig = await getConfigs(auth, "ContextLoss");
      if ("Item" in defConfig) {
        setFilter(defConfig["Item"]);
      }
    };
    asyncfunction();
  }, [auth]);

  const ChoosePanel = (panel) => {
    switch (panel) {
      case "chart": {
        return <ContextLossFilterPanel filter={filter} setFilter={setFilter} />;
      }
      case "y Axis": {
        return (
          <ContextLossFilterPanelYaxis filter={filter} setFilter={setFilter} />
        );
      }
      case "x Axis": {
        return (
          <ContextLossFilterPanelXaxis filter={filter} setFilter={setFilter} />
        );
      }
      case "slider": {
        return (
          <ContextLossFilterPanelSlider filter={filter} setFilter={setFilter} />
        );
      }
      case "legend": {
        return (
          <ContextLossFilterPanelLegend filter={filter} setFilter={setFilter} />
        );
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
              <ContextLossChartConfig data={rawdata} filter={filter} />
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
                auth={auth}
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
