import React, { useState } from "react";
import { SketchPicker } from "react-color";

const style = { padding: 4, border: "1px solid black",fontSize:10 };

export const ColorSelector = ({ colours, changefilter, filter }) => {
  const [colour, setColour] = useState(colours[0]);

  const handleChange = (color) => {
    changefilter(color.hex, colour.filter);
  };

  return (
    <div>
      <div
        style={{
          height: "100%",
          width: "100%",
          marginTop: 10,
          display: "flex",
        }}
      >
        {colours.map((item, i) => {
          return (
            <div
              onClick={() => setColour(item)}
              key={i}
              style={{
                ...style,
                backgroundColor: item.display === colour.display ? "grey" : "white",
                color: item.display === colour.display ? "white" : "black",
              }}
            >
              {item.display}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 10 }}>
        <SketchPicker
          color={filter[colour.filter]}
          onChangeComplete={handleChange}
        />
      </div>
    </div>
  );
};
