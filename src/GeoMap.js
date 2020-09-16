import React, { useEffect, useRef, useState } from "react";
import { GeoJSON, Map, ScaleControl } from "react-leaflet";
import * as topojson from "topojson-client";
import india from "./india.json";
import { getColor, layersUtils, getCenterOfGeoJson } from "./mapUtils";
import "leaflet/dist/leaflet.css";

const COUNTRY_VIEW_ID = "india-states";

export default function ChoroplethMapDrillDown() {
  const [geoJsonId, setGeoJsonId] = useState(COUNTRY_VIEW_ID);

  const geoJson = topojson.feature(india, india.objects[geoJsonId]);

  var mapRef = useRef(null);
  var geoJsonRef = useRef(null);

  const onDrillDown = (e) => {
    const featureId = e.target.feature.id;
    if (!india.objects[featureId]) {
      return;
    }
    setGeoJsonId(featureId);
  };

  useEffect(() => {
    if (mapRef.current && geoJsonRef.current) {
      mapRef.current.leafletElement.fitBounds(
        geoJsonRef.current.leafletElement.getBounds()
      );
    }
  });

  const mapCenter = getCenterOfGeoJson(geoJson);

  return (
    <div className="mapMainContainer">
      <div className="buttonWrapper">
        <button
          onClick={() => setGeoJsonId(COUNTRY_VIEW_ID)}
          className="backButton"
        >
          Back To Country View
        </button>
      </div>
      <Map className="map" center={mapCenter} zoom={4} ref={mapRef}>
        <GeoJSON
          data={geoJson}
          key={geoJsonId}
          style={geoJSONStyle}
          onEachFeature={onEachFeature}
          ref={geoJsonRef}
          id="geoJsonAll"
        />
        <ScaleControl />
      </Map>
    </div>
  );

  function onEachFeature(_, layer) {
    let layerUtils = layersUtils(geoJsonRef, mapRef);
    layer.on({
      mouseover: layerUtils.highlightOnClick,
      mouseout: layerUtils.resetHighlight,
      click: onDrillDown
    });
  }

  function geoJSONStyle(feature) {
    return {
      color: "#1f2021",
      weight: 1,
      fillOpacity: 0.5,
      fillColor: getColor(Math.floor(Math.random() * 26))
    };
  }
}
