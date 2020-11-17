import React, { useEffect, useRef, useState } from "react";
import covidData from "../../utilities/API";
import * as d3 from "d3";
import { DropDown} from "../forms";
import MenuItem from '@material-ui/core/MenuItem';
import { parseDate } from "../../utilities/function"
import states from "../../states.json";

const LineChart = () => {
    const [state, setState] = useState("al")
    const histoRef = useRef(null);
    useEffect(() => {
        const fetchData = async (state) => {
            let data = (await covidData.singleState(state)).data
            data = Object.assign(data.map((d) => {
                return (
                    d3.autoType({
                        date: parseDate(d.date),
                        value: d.positiveIncrease.toString()
                    })
                )
            }), { y: "Positive Increase" })
            return data
        }
        const sketch = async () => {
            let data = await fetchData(state)
            const height = 300;
            const width = 3 * height
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

            //clear canvas when re-rendering
            svg.selectAll("*").remove();

            svg.append("g")
                .call(xAxis);

            svg.append("g")
                .call(yAxis);

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "navy")
                .attr("stroke-width", 1.5)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", line);
        }
        sketch()

    },[state])


    const handleSubmit = (event) => {
        event.preventDefault();
        let choice = event.target.value
        setState(choice)
    }

    return (

        <div>
            <DropDown
                submit={handleSubmit}
                value= {state}
            >
                {states.map((s) => {
                    return (
                        <MenuItem
                            value={s.abbreviation}
                        >{s.abbreviation.toUpperCase()}</MenuItem>
                    )
                })}
            </DropDown>
            <svg ref={histoRef}></svg>
        </div>
    )
}

export default LineChart;