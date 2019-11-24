import React from "react";
import {Component} from "react";
import ReactMapGL, {Marker} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapMarkerSrc from "../images/noun_Map Marker_50018.svg";

const DEFAULT_VIEWPORT = {
  width: 800,
  height: 800
};

const WA_FRAME = {
  latitude: -25.22507316013293,
  longitude: 120.56882265483276,
  zoom: 4.5
};

async function getPoints(){
  const response = await fetch('http://localhost:3001/api/points');
  return await response.json();
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        ...DEFAULT_VIEWPORT,
        ...WA_FRAME
      }
    };
  }

  componentDidMount() {
    getPoints().then(points => {
      this.setState({points});
    })
  }

  goToWA = () => {
    const viewport = {...this.state.viewport, ...WA_FRAME};
    this.setState({viewport});
  };

  onUserViewportChange(viewport) {
    this.setState({viewport});
  }

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={
            "pk.eyJ1IjoidG9taXNtZSIsImEiOiIxT1BKRnhnIn0.YXYvDFkvu7ihmgKIVbExoQ"
          }
          onViewportChange={this.onUserViewportChange.bind(this)}
        >
          {this.state.points && this.state.points.map((point, i) => (
            <Marker
              key={i}
              longitude={point.longitude}
              latitude={point.latitude}
            >
              <img src={mapMarkerSrc} width={40} />
            </Marker>
          ))}
        </ReactMapGL>
        <button onClick={this.goToWA.bind(this)}>Back to WA</button>
      </div>
    );
  }
}

export default App;

// TODO: "Map Marker by Bastian König from the Noun Project"
