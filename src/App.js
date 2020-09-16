import React from "react";
import "./styles.css";
import ChoroplethMapDrillDown from "./GeoMap";

export default function App() {
  return (
    <div className="App">
      <h1>Hello web enthusiasts</h1>
      <h2>Drilldown map using Leaflet in react</h2>
      <ChoroplethMapDrillDown />
      <br />
      <p>
        <sup>*</sup>Color change after mouse out is due rendom color selction in
        style of geomap.
      </p>
    </div>
  );
}
