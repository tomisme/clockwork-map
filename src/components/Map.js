import React from "react";
import ReactMapGL, {Marker} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PlaceMarker from "./PlaceMarker";

const Map = ({viewport, onUserViewportChange, points}) => (
  <ReactMapGL
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={onUserViewportChange}
  >
    {points &&
      points.map((point, i) => (
        <Marker key={i} longitude={point.longitude} latitude={point.latitude}>
          <PlaceMarker />
        </Marker>
      ))}
  </ReactMapGL>
);

export default Map;
// TODO: "Map Marker by Bastian König from the Noun Project"
