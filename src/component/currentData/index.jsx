import React, { useEffect, useState } from "react";
import { DataCell } from "../dataDisplay"
import "./style.scss";
import covidData from "../../utilities/API"
import Choropleth from "../choropleth"

const CurrentData = () => {
    const [totalCase, setTotalCase] = useState({});
    const [totalDeath, setTotalDeath] = useState({});
    useEffect(() => {
        const fetchData = (async () => {
            const data = (await covidData.usCurrent()).data[0]
            setTotalDeath(
                {
                    current: data.death,
                    increased: data.deathIncrease
                }
            )
            setTotalCase(
                {
                    current: data.positive,
                    increased: data.positiveIncrease
                }
            )
        })();
    }, [])


    return (
        <>
            <h1>Covid-19 Data Visualizer</h1>
            <p>Data provided by <a href="https://covidtracking.com/">The Covid Tracking Project</a></p>
            <div className="stat-display">
                <DataCell
                    title="Total Cases"
                    data={totalCase}
                />
                <DataCell
                    title="Total Deaths"
                    data={totalDeath}
                />
            </div>
            <Choropleth></Choropleth>

        </>
    )
}

export default CurrentData;