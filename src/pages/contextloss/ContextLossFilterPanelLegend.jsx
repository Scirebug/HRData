import React from "react";
import { ColorSelector } from "../../components/ColorSelector";

const colours = [
  { filter: "legendTextColor", display: "text" }
];

const marginTop = 5;

export const ContextLossFilterPanelLegend = ({ filter, setFilter }) => {
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
        {/* legendInnerGap */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={100}
            value={filter.legendInnerGap}
            onChange={(e) => changefilter(e.target.valueAsNumber, "legendInnerGap")}
          />
          {`inner Gap ${filter.legendInnerGap}`}
        </div>
         {/* legendOuterGap */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={100}
            value={filter.legendOuterGap}
            onChange={(e) => changefilter(e.target.valueAsNumber, "legendOuterGap")}
          />
          {`outer Gap ${filter.legendOuterGap}`}
        </div>

          {/* legendFontSize */}
          <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={6}
            max={30}
            value={filter.legendFontSize}
            onChange={(e) => changefilter(e.target.valueAsNumber, "legendFontSize")}
          />
          {`legend font size ${filter.legendFontSize}`}
        </div>
         {/* legendFontWeight */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={100}
            max={900}
            step={100}
            value={filter.legendFontWeight}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "legendFontWeight")
            }
          />
          {`legend font weight ${filter.legendFontWeight}`}
        </div>

            
        {/* legendLineLength */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={100}
            value={filter.legendLineLength}
            onChange={(e) => changefilter(e.target.valueAsNumber, "legendLineLength")}
          />
          {`line length ${filter.legendLineLength}`}
        </div>
         {/* legendLineWidth */}
         <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={10}
            value={filter.legendLineWidth}
            onChange={(e) =>
              changefilter(e.target.valueAsNumber, "legendLineWidth")
            }
          />
          {`line width ${filter.legendLineWidth}`}
        </div>
        {/* legendOffset */}
        <div style={{ marginTop: marginTop }}>
          <input
            style={{ width: 200 }}
            type="range"
            min={0}
            max={100}
            value={filter.legendOffset}
            onChange={(e) => changefilter(e.target.valueAsNumber, "legendOffset")}
          />
          {`legend offset ${filter.legendOffset}`}
        </div>
        
          {/* legendShow */}
          <div style={{ marginTop: marginTop }}>
          <input
            type="checkbox"
            checked={filter.legendShow}
            value={"legendShow"}
            onChange={() => changefilter(!filter.legendShow, "legendShow")}
          />
          legend Show
        </div>
         {/* lineFirst */}
         <div style={{ marginTop: marginTop }}>
          <input
            type="checkbox"
            checked={filter.lineFirst}
            value={"lineFirst"}
            onChange={() => changefilter(!filter.lineFirst, "lineFirst")}
          />
          line first
        </div>
                        
      </div>
      <ColorSelector colours={colours}  changefilter={changefilter} filter={filter}/>
    </div>
  );
};
   