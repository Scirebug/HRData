import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Stacked } from "./pages/Stacked";
import {Line} from "./pages/Line";
import { Home } from "./pages/Home";

function App() {
  return (
    <div style={{ fontFamily: "Graphic", height: "100vh", width: "100vw" }}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/stacked" element={<Stacked />} />
        <Route exact path="/line" element={<Line />} />
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
