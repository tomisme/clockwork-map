import React from "react";
import imgUrl from "../images/noun_Map Marker_50018.svg";

const attributes = {
  style: {
    width: "10px",
    height: "10px",
    backgroundSize: "cover",
    backgroundImage: "url('" + imgUrl + "')"
  }
};

const MarkerDiv = () => <div {...attributes} />;

export default MarkerDiv;
