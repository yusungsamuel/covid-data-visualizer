import React, { useEffect, useState } from "react";
import covidData from "../../utilities";
import * as d3 from "d3";
import * as d3Arr from "d3-array";
import states from "../../states.json"

const RacingBar = () => {
    useEffect(() => {
        async function fetchData() {

            const name = new Set(states.map(s => s.abbreviation))

            // console.log(name);

            let promise = []

            states.forEach((s) => {
                promise.push(covidData.singleState(s.abbreviation))
            })

            let response = await Promise.all(promise)
            // console.log(response)

            const parseDate = (str) => {
                str = str.toString()
                str = str.split("");
                str.splice(4, 0, "-");
                str.splice(7, 0, "-");
                str = (str.join(""));

                return str
            }

            let data = [];
            response.forEach((r) => {
                r.data.forEach((d) => {
                    let obj = {}
                    obj.date = parseDate(d.date);
                    obj.name = d.state;
                    obj.value = d.positive.toString()
                    data.push(d3.autoType(obj))
                })
            })

            const datevalues = Array.from(d3Arr.rollup(data, ([d]) => d.value, d => +d.date, d => d.name))
                .map(([date, data]) => [new Date(date), data])
                .sort(([a], [b]) => d3.ascending(a, b))

            console.log(datevalues)

        }
        fetchData();

    }, [])

    return (
        <div>

        </div>
    )
}

export default RacingBar;