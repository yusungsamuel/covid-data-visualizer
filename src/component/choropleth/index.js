import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import us from "../../states-albers-10m.json"
import covidData from "../../utilities/API"
import legend from "../legend"
import { DropDown } from "../forms"
import MenuItem from '@material-ui/core/MenuItem';
import stateConversion from "../../state-conversion.json"
import "./style.scss"

const possibleChoice = ["Positive", "Hospitalized", "Death"]

const Choropleth = (props) => {
    const choroRef = useRef(null);
    const [choice, setChoice] = useState("Positive")

    const setViewingState = props.handleClick

    const fetchData = async () => {
        const response = (await covidData.allStateCurrent()).data
        const data = new Map();
        let temp = []
        response.forEach((r) => {
            const state = stateConversion[r.state]
            if (!state) return
            switch (choice) {
                case "Hospitalized":
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
        return data
    }


    useEffect(() => {

        async function sketch() {
            const data = await fetchData()
            const format = d => `${d}`
            const path = d3.geoPath();
            let color;
            if (choice === "Positive") {
                color = d3.scaleQuantize([0, 1000], d3.schemePurples[9])
            }
            else if (choice === "Hospitalized") {
                color = d3.scaleQuantize([0, 5], d3.schemePurples[9])
            }
            else {
                color = d3.scaleQuantize([0, 20], d3.schemePurples[9])

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
                .on("click", function (data) {
                    setViewingState(data.properties.name)
                })
                .append("title")
                .text(d => {
                    let number = format(data.get(d.properties.name))
                    return `${d.properties.name}
${number > 1000 ? number / 1000 + "M" : number + "K"}`
                })


            //borderlines
            svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
                .attr("fill", "none")
                .attr("stroke", "indigo")
                .attr("stroke-linejoin", "round")
                .attr("d", path);

        }
        sketch()
    }, [choice])
    
    const handleSubmit = (event) => {
        setChoice(event.target.value)
    }

    return (
        <>
            <DropDown
                submit={handleSubmit}
                value={choice}
            >
                {possibleChoice.map((c) => {
                    return (
                        <MenuItem
                            value={c}
                            key={c}
                        >
                            {c.toUpperCase()}
                        </MenuItem>
                    )
                })}
            </DropDown>
            <svg className="choro" ref={choroRef}></svg>
        </>
    )
};

export default Choropleth;