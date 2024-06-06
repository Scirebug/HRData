import React from "react";

export const Home = () => {
  const liStyle = { marginBottom: 10 };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <h1 style={{ position: "absolute", top: 50 }}>HR Data D3 patterns</h1>
      <ul>
        <li style={liStyle}>
          <a href={`/stacked`}>Stacked</a>
        </li>
      </ul>
    </div>
  );
};
