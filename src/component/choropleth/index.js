import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import us from "../../states-albers-10m.json"
import covidData from "../../utilities/API"
import legend from "../legend"
import { DataDisplay, TableRow } from "../dataDisplay"
import { DropDown, Option } from "../forms"
import stateConversion from "../../state-conversion.json"
import "./style.scss"

const possibleChoice = ["Percent Positive", "Hospitalized Currently", "Death"]

const Choropleth = () => {
    const [currentData, setCurrentData] = useState(null);
    const [choice, setChoice] = useState("Percent Positive")
    const choroRef = useRef(null);

    const fetchData = async () => {
        const response = (await covidData.allStateCurrent()).data
        console.log(response)
        const data = new Map();
        let temp = []
        response.forEach((r) => {
            const state = stateConversion[r.state]
            if (!state) return
            switch (choice) {
                case "Hospitalized Currently":
                    const hospitalized = Math.ceil(r.hospitalizedCurrently / 1000)
                    data.set(state, hospitalized);
                    temp.push([state, hospitalized])
                    break
                case "Death":
                    const death = Math.ceil(r.death / 1000)
                    data.set(state, death);
                    temp.push([state, death])
                    break
                default:
                    const positive = Math.ceil(r.positive / 1000)
                    data.set(state, positive);
                    temp.push([state, positive])
                    break
            }

        })
        setCurrentData(temp)
        return data
    }


    useEffect(() => {

        async function sketch() {
            const data = await fetchData()
            const format = d => `${d}`
            const path = d3.geoPath();
            let color;
            if (choice === "Death") {
                color = d3.scaleQuantize([0, .5], d3.schemeReds[9])
            }
            else {
                color = d3.scaleQuantize([0, 1000], d3.schemeReds[9])
            }


            const svg = d3.select(choroRef.current)
                .attr("viewBox", [0, 0, 975, 610]);

            svg.selectAll("*").remove();

            svg.append("g")
                .attr("transform", "translate(610,20)")
                .append(() => legend({ color, title: data.title, width: 260 }));

            svg.append("g")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .join("path")
                .attr("fill", d => color(data.get(d.properties.name)))
                .attr("d", path)
                .append("title")
                .text(d => `${d.properties.name} ${format(data.get(d.properties.name))}`);

            //white borderlines
            svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-linejoin", "round")
                .attr("d", path);

        }
        sketch()
    }, [choice])


    const handleSubmit = (event) => {
        event.preventDefault();
        let choice = event.target.value
        setChoice(choice)
    }


    return (
        <div className="current-data">
            <DropDown
                submit={handleSubmit}
            >
                {possibleChoice.map((c, i) => {
                    return (
                        <Option
                            key={i}
                            option={c}
                        ></Option>
                    )
                })}
            </DropDown>
            <DataDisplay>
                {currentData ? currentData.map((c) => {
                    return (
                        <TableRow
                            name={c[0]}
                            stat={c[1]}
                        ></TableRow>

                    )
                }) : <div></div>}
            </DataDisplay>
            <svg className="choro" ref={choroRef}></svg>
        </div>
    )
};

export default Choropleth;