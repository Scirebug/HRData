import React from "react";
// import { ColorSelector } from "../../components/ColorSelector";

// const colours = [
//   { filter: "color_354M", display: "354M" },
//   { filter: "color_772M", display: "772M" },
//   { filter: "color_156B", display: "156B" },
//   { filter: "gridColor", display: "grid" },
// ];

const marginTop = 5;

export const StackedFilterPanel = ({ filter, setFilter }) => {
  const changefilter = (val, key) => {
    const newFilter = { ...filter, [key]: val };
    setFilter(newFilter);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        marginTop: 10,
        display: "block",
      }}
    >
      <div>
        {/* containerwidth */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={300}
            max={1000}
            value={filter.containerwidth}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "containerwidth")
            }
          />
          {`container width ${filter.containerwidth}`}
        </div>
        {/* containerheight */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={300}
            max={1000}
            value={filter.containerheight}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "containerheight")
            }
          />
          {`container height ${filter.containerheight}`}
        </div>
       
      </div>
      {/* <ColorSelector
        colours={colours}
        changefilter={changefilter}
        filter={filter}
      /> */}
    </div>
  );
};
