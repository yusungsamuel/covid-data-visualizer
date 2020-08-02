import React, { useEffect, useRef } from "react";
import covidData from "../../utilities";
import * as d3 from "d3";
import {DropDown, Option} from "../forms";
import states from "../../states.json";

let LineChart = () => {
    const histoRef = useRef(null);
    useEffect(() => {
        const fetchData = async (state) => {
            let data = (await covidData.singleState(state)).data
            const parseDate = (str) => {
                str = str.toString()
                str = str.split("");
                str.splice(4, 0, "-");
                str.splice(7, 0, "-");
                str = (str.join(""));

                return str
            }
            data = Object.assign(data.map((d) => {
                return (
                    d3.autoType({
                        date: parseDate(d.date),
                        value: d.positiveIncrease.toString()
                    })
                )
            }), { y: "Positive Increase" })

            const height = 500;
            const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            const margin = ({ top: 20, right: 30, bottom: 30, left: 40 });

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)]).nice()
                .range([height - margin.bottom, margin.top])

            const yAxis = g => g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y))
                .call(g => g.select(".domain").remove())
                .call(g => g.select(".tick:last-of-type text").clone()
                    .attr("x", 3)
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold")
                    .text(data.y))

            const x = d3.scaleUtc()
                .domain(d3.extent(data, d => d.date))
                .range([margin.left, width - margin.right])

            const xAxis = g => g
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).ticks(width / 100).tickSizeOuter(0))


            const line = d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => x(d.date))
                .y(d => y(d.value))

            const svg = d3.select(histoRef.current)
                .attr("viewBox", [0, 0, width, height]);

            svg.append("g")
                .call(xAxis);

            svg.append("g")
                .call(yAxis);

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", line);
        }
        fetchData("ca");

    })
    return (

        <div>
            <DropDown>
                {states.map((state)=>{
                    return (
                        <Option
                            option={state.abbreviation}
                        ></Option>
                    )
                })}
            </DropDown>
            <svg ref={histoRef}></svg>
        </div>
    )
}

export default LineChart;