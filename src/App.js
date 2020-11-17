import React, { useEffect, useState, useRef } from 'react';
import './App.scss';
import { NavBar, NavItem } from "./component/navbar"
import RacingBar from "./component/racingBar";
import PieChart from "./component/pieChart";
import LineChart from "./component/lineChart"
import CurrentData from "./component/currentData/index"
import AppBar from '@material-ui/core/AppBar';

function App() {
  const [activeIndex, setActiveIndex] = useState("0");
  const option = ["Current Data", "Trends by state", "Competition between states"]
  const handleClick = (index) => {
    console.log(index)
    setActiveIndex(index)
  }

  const conditionalRender = (index) => {
    switch (index) {
      case (0):
        return (
          <CurrentData></CurrentData>
        )
      case (1):
        return (<LineChart></LineChart>)
      case (2):
        return (<RacingBar></RacingBar>)
      default:
        return (<CurrentData></CurrentData>)
    }

  }

  return (
    <div className="App">
      <div className="header">
        <h1>Covid-19 Data Visualizer</h1>
        <h3>An intuitive way to see Coronavirus Disease 2019 data</h3>
      </div>

      <NavBar
        options={option}
        click={handleClick}
      />
      <div className="main">

        {conditionalRender(activeIndex)}
      </div>
      <AppBar
        position="relative"
        color="transparent"
        style={{ "background-color": "#219653" }}
      >
        <p className="footer">Data provided by <a href="https://covidtracking.com/">The Covid Tracking Project</a></p>
      </AppBar>
    </div>
  );
}

export default App;
