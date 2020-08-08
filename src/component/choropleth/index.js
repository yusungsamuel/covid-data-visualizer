import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import us from "../../states-albers-10m.json"
import covidData from "../../utilities/API"
import states from "../../states.json"

const Choropleth = () => {
    const choroRef = useRef(null);
    const fetchData = async () => {
        const response = (await covidData.allStateCurrent()).data
        const data = new Map();
        // console.log(response)
        response.forEach((r) => {
            console.log(typeof r.state)
            data.set(states[r.state], r.positive)
        })
        return data
    }


    useEffect(() => {
        async function sketch() {
            const data = await fetchData()
            console.log(data)
            const format = d => `${d}%`
            const path = d3.geoPath();
            const color = d3.scaleQuantize([1, 7], d3.schemeBlues[6])

            const svg = d3.select(choroRef.current)
                .attr("viewBox", [0, 0, 975, 610]);

            svg.append("g")
                .attr("transform", "translate(610,20)")
                // .append(() => legend({ color, title: data.title, width: 260 }));

            svg.append("g")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .join("path")
                .attr("fill", d => color(data.get(d.properties.name)))
                .attr("d", path)
                .append("title")
                .text(d => `${d.properties.name}
${format(data.get(d.properties.name))}`);

            svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-linejoin", "round")
                .attr("d", path);
        }
        sketch()
    })





    return (
        <svg ref={choroRef}></svg>
    )
};

export default Choropleth;