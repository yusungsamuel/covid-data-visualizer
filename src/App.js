import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { NavBar, NavItem } from "./component/navbar"
import RacingBar from "./component/racingBar";
import PieChart from "./component/pieChart";
import LineChart from "./component/lineChart"
import Choropleth from "./component/choropleth"


function App() {
  const navigations = ["Current Status", "Cumulative Counts", "Racing Bar Chart"];
  const [activeIndex, setActiveIndex] = useState("0");
  const arr = [Choropleth, LineChart, RacingBar]
  const handleClick = (e) => {
    e.preventDefault();
    const index = e.target.dataset.index
    setActiveIndex(index)
    console.log(typeof activeIndex)
  }

  const conditionalRender = (index) => {
    switch (index) {
      case ("0"):
        return (<Choropleth></Choropleth>)
      case ("1"):
        return (<LineChart></LineChart>)
      case ("2"):
        return (<RacingBar></RacingBar>)
      default:
        return (<Choropleth></Choropleth>)
    }

  }

  return (
    <div className="App">

      <NavBar>
        {navigations.map((navigation, i) => {
          return (
            <NavItem
              key={i}
              dataIndex={i}
              title={navigation}
              handleClick={handleClick}
            ></NavItem>
          )
        })}
      </NavBar>
      <div className="view-box">
        {conditionalRender(activeIndex)}
      </div>
    </div>
  );
}

export default App;
