import React from "react";

const style = { padding: 10, border: "1px solid black" };


export const PanelSelector = ({
  panel,
  setPanel,
  panels,
}) => {
  

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
