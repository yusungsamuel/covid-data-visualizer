import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import covidData from "./utilities"
import axios from "axios";
import RacingBar from "./component/racingBar";
import PieChart from "./component/pieChart";
import LineChart from "./component/lineChart"
import { select, scaleLinear, max, scaleBand } from "d3";


function App() {
  const [chinaCase, setChinaCase] = useState([]);
  // const canvas = useRef(null);



  // useEffect(() => {
  //   let cancel
  //   covidData.dayOneLive("china")
  //     .then(response => {
  //       setChinaCase(response.data)
  //       new axios.CancelToken(c => cancel = c)
  //       return () => cancel()
  //     })

  //   //d3 codes
  //   const svg = select("svg");
  //   const width = +svg.attr("width")
  //   const height = +svg.attr("height")

  //   const render = data => {
  //     const xValue = d => d.Cases;
  //     const yValue = d => d.Date;
  //     const xScale = scaleLinear()
  //       .domain([0,max(data, d => d.Cases )])
  //       .range([0, width]);

  //     const yScale = scaleBand()
  //       .domain(data.map(yValue))
  //       .range([0, height]);
  //     svg.selectAll("rect").data(data)
  //       .enter().append("rect")
  //         .attr("y", d => yScale(yValue(d)))
  //         .attr("width", d=> xScale(xValue(d)))
  //         .attr("height", yScale.bandwidth());
  //   };
  //   render(chinaCase);
  // }, [chinaCase]);


  return (
    <div className="App">
      <RacingBar></RacingBar>
      {/* <PieChart></PieChart>  */}
      <LineChart></LineChart>
    </div>
  );
}

export default App;
