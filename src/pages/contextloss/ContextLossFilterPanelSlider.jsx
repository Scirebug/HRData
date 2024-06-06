import React from "react";
import { ColorSelector } from "../../components/ColorSelector";

const colours = [
  { filter: "sliderTextColor", display: "text" },
  { filter: "sliderLabelTextColor", display: "label" },
];

const marginTop = 5;

export const ContextLossFilterPanelSlider = ({ filter, setFilter }) => {
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
        {/* sliderOffset */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={100}
            value={filter.sliderOffset}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "sliderOffset")
            }
          />
          {`slider Offset ${filter.sliderOffset}`}
        </div>
          {/* sliderFontSize */}
          <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={6}
            max={30}
            value={filter.sliderFontSize}
            onChange={(e) => changefilter(e.target.valueAsNumber, "sliderFontSize")}
          />
          {`font size ${filter.sliderFontSize}`}
        </div>
         {/* sliderFontWeight */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={100}
            max={900}
            step={100}
            value={filter.sliderFontWeight}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "sliderFontWeight")
            }
          />
          {`font weight ${filter.sliderFontWeight}`}
        </div>
         {/* sliderLabelShow */}
         <div style={{ marginTop: marginTop }}>
          <input
            type="checkbox"
            checked={filter.sliderLabelShow}
            value={"sliderLabelShow"}
            onChange={() => changefilter(!filter.sliderLabelShow, "sliderLabelShow")}
          />
          Show Label
        </div>
         {/* sliderValueShow */}
         <div style={{ marginTop: marginTop }}>
          <input
            type="checkbox"
            checked={filter.sliderValueShow}
            value={"sliderValueShow"}
            onChange={() => changefilter(!filter.sliderValueShow, "sliderValueShow")}
          />
          Show Value
        </div>

        {/* sliderLabelOffsetX */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={-60}
            max={60}
            value={filter.sliderLabelOffsetX}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "sliderLabelOffsetX")
            }
          />
          {`label Offset X ${filter.sliderLabelOffsetX}`}
        </div>
        {/* sliderLabelOffsetY */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={-60}
            max={60}
            value={filter.sliderLabelOffsetY}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "sliderLabelOffsetY")
            }
          />
          {`label Offset Y ${filter.sliderLabelOffsetY}`}
        </div>
        {/* sliderLabelGap */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={60}
            value={filter.sliderLabelGap}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "sliderLabelGap")
            }
          />
          {`label gap ${filter.sliderLabelGap}`}
        </div>

         {/* sliderLabelFontSize */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={6}
            max={30}
            value={filter.sliderLabelFontSize}
            onChange={(e) => changefilter(e.target.valueAsNumber, "sliderLabelFontSize")}
          />
          {`label font size ${filter.sliderLabelFontSize}`}
        </div>
         {/* sliderLabelFontWeight */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={100}
            max={900}
            step={100}
            value={filter.sliderLabelFontWeight}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "sliderLabelFontWeight")
            }
          />
          {`label font weight ${filter.sliderLabelFontWeight}`}
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
