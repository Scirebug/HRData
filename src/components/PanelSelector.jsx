import React, { useState } from "react";
import { saveConfig, getConfigList } from "../api/s3";

const style = { padding: 10, border: "1px solid black" };
const buttonStyle = {
  marginLeft: 10,
  border: "1px solid #000000",
  borderRadius: 6,
  padding: 3,
  fontSize: 12,
  cursor: "pointer",
};

export const PanelSelector = ({
  panel,
  setPanel,
  panels,
  filter,
  setFilter,
}) => {
  const [showList, setShowList] = useState(false);
  const [configList, setConfigList] = useState();

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        marginTop: 10,
        display: "flex",
      }}
    >
      {panels.map((item, i) => {
        return (
          <div
            onClick={() => setPanel(item)}
            key={i}
            style={{
              ...style,
              backgroundColor: item === panel ? "grey" : "white",
              color: item === panel ? "white" : "black",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
