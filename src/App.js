import React, { useEffect, useState, useRef } from 'react';
// import './App.css';
import {NavBar, NavItem} from "./component/navbar"
import RacingBar from "./component/racingBar";
import PieChart from "./component/pieChart";
import LineChart from "./component/lineChart"
import Choropleth from "./component/choropleth"


function App() {
  const navigations = ["Current Status", "Cumulative Counts", "Racing Bar Chart"];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e) =>{
    e.preventDefault();
    const index = e.target.dataset.index
    console.log(index)
    setActiveIndex(index)
  }


  return (
    <div className="App">
      <div>
        <NavBar>
          {navigations.map((navigation, i)=>{
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
      </div>
      {/* <RacingBar></RacingBar> */}
      {/* <PieChart></PieChart>  */}
      {/* <LineChart></LineChart> */}
      {/* <Choropleth></Choropleth> */}
    </div>
  );
}

export default App;
