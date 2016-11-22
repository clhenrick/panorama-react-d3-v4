import React, { Component } from 'react';
import * as d3 from 'd3';
import './App.css';

window.d3 = d3;

import ExampleScatterPlot from './components/ExampleScatterPlot';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>hello world</p>
        <ExampleScatterPlot />
      </div>
    );
  }
}

export default App;
