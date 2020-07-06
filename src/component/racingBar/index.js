import React, { useEffect, useState } from "react";
import covidData from "../../utilities";

const RacingBar = () => {
    useEffect(() => {
        async function fetchData() {
            let countries = await covidData.getAllCountries();
            let countryArray = countries.data
            let promise = []
            countryArray.forEach((c) => {
                promise.push(covidData.dayOne(c.Slug));
            })
            let resolved = await Promise.all(promise)
            resolved.forEach((r) => {
                r = r.data
            })
            console.log(resolved)
        }
        fetchData();

    }, [])

    return (
        <div>

        </div>
    )
}

export default RacingBar;