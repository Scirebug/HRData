import React from "react";
import { ColorSelector } from "../../components/ColorSelector";

const colours = [
  { filter: "color_354M", display: "354M" },
  { filter: "color_772M", display: "772M" },
  { filter: "color_156B", display: "156B" },
  { filter: "gridColor", display: "grid" },
];

const marginTop = 5;

export const ContextLossFilterPanel = ({ filter, setFilter }) => {
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
        {/* strokeWidth */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={1}
            max={10}
            value={filter.strokeWidth}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "strokeWidth")
            }
          />
          {`line width ${filter.strokeWidth}`}
        </div>
        {/* layoutMarginTop */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={200}
            value={filter.layoutMarginTop}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "layoutMarginTop")
            }
          />
          {`margin top ${filter.layoutMarginTop}`}
        </div>
        {/* layoutMarginRight */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={200}
            value={filter.layoutMarginRight}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "layoutMarginRight")
            }
          />
          {`margin right ${filter.layoutMarginRight}`}
        </div>
        {/* layoutMarginBottom */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={200}
            value={filter.layoutMarginBottom}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "layoutMarginBottom")
            }
          />
          {`margin bottom ${filter.layoutMarginBottom}`}
        </div>
        {/* layoutMarginLeft */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={200}
            value={filter.layoutMarginLeft}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "layoutMarginLeft")
            }
          />
          {`margin left ${filter.layoutMarginLeft}`}
        </div>
          {/* gridShow */}
          <div style={{ marginTop: marginTop }}>
          <input
            type="checkbox"
            checked={filter.gridShow}
            value={"gridShow"}
            onChange={() => changefilter(!filter.gridShow, "gridShow")}
          />
          grid Show
        </div>
      </div>
      <ColorSelector
        colours={colours}
        changefilter={changefilter}
        filter={filter}
      />
    </div>
  );
};
