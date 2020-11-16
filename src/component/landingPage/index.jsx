import React, { useEffect, useState } from "react";
import {DataCell} from "../dataDisplay"
import "./style.scss";
import covidData from "../../utilities/API"

const LandingPage = () => {
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
    )
}

export default LandingPage;