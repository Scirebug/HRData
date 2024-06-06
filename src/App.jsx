import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Stacked } from "./pages/Stacked";
import { Home } from "./pages/Home";

function App() {
  return (
    <div style={{ fontFamily: "Graphic", height: "100vh", width: "100vw" }}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/stacked" element={<Stacked />} />
      </Routes>
    </div>
  );
}
const RoutedApp = () => (
  <Router>
    <App></App>
  </Router>
);

export default RoutedApp;
