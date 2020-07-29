import React, { useEffect, useState } from "react";
import covidData from "../../utilities";
import {group} from "d3";
import states from "../../states.json"

const RacingBar = () => {
    useEffect(() => {
        async function fetchData() {
            let promise = []
            
            states.forEach((s)=>{
                promise.push(covidData.singleState(s.abbreviation))
            })

            let data = await Promise.all(promise)
            // console.log(data)

            let arr = []
            // data.forEach
            // countryArray.forEach((c) => {
            //     promise.push(covidData.dayOne(c.Slug));
            // })
            // let data = await Promise.all(promise)
            // data.forEach((d) => {
            //     d = d.data
            // })
            // console.log(data)
            // let datevalues = Array.from(d3.nest.rollup(data, ([d]) => d.value, d => +d.date, d => d.name))
            //     .map(([date, data]) => [new Date(date), data])
            //     .sort(([a], [b]) => d3.ascending(a, b))
            // console.log(datevalues)
        }
        fetchData();

    }, [])

    return (
        <div>

        </div>
    )
}

export default RacingBar;