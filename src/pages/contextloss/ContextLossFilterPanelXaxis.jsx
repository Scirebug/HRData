import React from "react";
import { ColorSelector } from "../../components/ColorSelector";

const colours = [
  { filter: "xAxisTickLineColour", display: "tick" },
  { filter: "xAxisDomainColour", display: "line" },
  { filter: "xAxisTextColour", display: "text" },
  { filter: "xLabelColor", display: "label" },
];

const marginTop = 5;

export const ContextLossFilterPanelXaxis = ({ filter, setFilter }) => {
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
        {/* xAxisTickSizeInner */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={20}
            value={filter.xAxisTickSizeInner}
            onChange={(e) => changefilter(e.target.valueAsNumber, "xAxisTickSizeInner")}
          />
          {`tick size ${filter.xAxisTickSizeInner}`}
        </div>

          {/* xAxisFontSize */}
          <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={6}
            max={30}
            value={filter.xAxisFontSize}
            onChange={(e) => changefilter(e.target.valueAsNumber, "xAxisFontSize")}
          />
          {`x axis font size ${filter.xAxisFontSize}`}
        </div>
         {/* xAxisFontWeight */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={100}
            max={900}
            step={100}
            value={filter.xAxisFontWeight}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "xAxisFontWeight")
            }
          />
          {`x axis font weight ${filter.xAxisFontWeight}`}
        </div>

            
        {/* xLabelFontSize */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={6}
            max={30}
            value={filter.xLabelFontSize}
            onChange={(e) => changefilter(e.target.valueAsNumber, "xLabelFontSize")}
          />
          {`label font size ${filter.xLabelFontSize}`}
        </div>
         {/* xLabelFontWeight */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={100}
            max={900}
            step={100}
            value={filter.xLabelFontWeight}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "xLabelFontWeight")
            }
          />
          {`label font weight ${filter.xLabelFontWeight}`}
        </div>
        {/* xLabelOffset */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={100}
            value={filter.xLabelOffset}
            onChange={(e) => changefilter(e.target.valueAsNumber, "xLabelOffset")}
          />
          {`label offset ${filter.xLabelOffset}`}
        </div>
                        
      </div>
      <ColorSelector colours={colours}  changefilter={changefilter} filter={filter}/>
    </div>
  );
};
   