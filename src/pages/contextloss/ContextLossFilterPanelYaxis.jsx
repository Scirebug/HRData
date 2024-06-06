import React from "react";
import { ColorSelector } from "../../components/ColorSelector";

const colours = [
  { filter: "yAxisTickLineColour", display: "tick" },
  { filter: "yAxisDomainColour", display: "line" },
  { filter: "yAxisTextColour", display: "text" },
  { filter: "yLabelColor", display: "label" },
];

const marginTop = 5;

export const ContextLossFilterPanelYaxis = ({ filter, setFilter }) => {
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
        {/* yAxisTickSizeInner */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={20}
            value={filter.yAxisTickSizeInner}
            onChange={(e) => changefilter(e.target.valueAsNumber, "yAxisTickSizeInner")}
          />
          {`tick size ${filter.yAxisTickSizeInner}`}
        </div>

         {/* yAxisFontSize */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={6}
            max={30}
            value={filter.yAxisFontSize}
            onChange={(e) => changefilter(e.target.valueAsNumber, "yAxisFontSize")}
          />
          {`y axis font size ${filter.yAxisFontSize}`}
        </div>
         {/* yAxisFontWeight */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={100}
            max={900}
            step={100}
            value={filter.yAxisFontWeight}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "yAxisFontWeight")
            }
          />
          {`y axis font weight ${filter.yAxisFontWeight}`}
        </div>


         {/* yLabelFontSize */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={6}
            max={30}
            value={filter.yLabelFontSize}
            onChange={(e) => changefilter(e.target.valueAsNumber, "yLabelFontSize")}
          />
          {`label font size ${filter.yLabelFontSize}`}
        </div>
         {/* yLabelFontWeight */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={100}
            max={900}
            step={100}
            value={filter.yLabelFontWeight}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "yLabelFontWeight")
            }
          />
          {`label font weight ${filter.yLabelFontWeight}`}
        </div>
        {/* yLabelOffset */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={100}
            value={filter.yLabelOffset}
            onChange={(e) => changefilter(e.target.valueAsNumber, "yLabelOffset")}
          />
          {`label offset ${filter.yLabelOffset}`}
        </div>
                        
      </div>
      <ColorSelector colours={colours}  changefilter={changefilter} filter={filter}/>
    </div>
  );
};
   