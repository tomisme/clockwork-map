import React, {Component} from "react";
import Map from "./Map";
import "./App.css"

const DEFAULT_VIEWPORT = {
  width: 600,
  height: 700
};

const WA_FRAME = {
  latitude: -25.22507316013293,
  longitude: 120.56882265483276,
  zoom: 4.3
};

async function getPoints() {
  const response = await fetch("http://localhost:3001/api/points");
  return await response.json();
}

class App extends Component {
  constructor(props) {
    super(props);

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
    });
  }

  goToWA() {
    this.setState({viewport: {...this.state.viewport, ...WA_FRAME}});
  }

  updateMapViewport(viewport) {
    this.setState({viewport});
  }

  render() {
    return (
      <div>
        <Map
          viewport={this.state.viewport}
          onUserViewportChange={(viewport) => this.updateMapViewport(viewport)}
          points={this.state.points}
        />
        <button onClick={() => this.goToWA()}>Back to WA</button>
      </div>
    );
  }
}

export default App;
