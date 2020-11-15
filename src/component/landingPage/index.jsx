import React, { useEffect, useState } from "react";
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
            <div>
                <h2>Total Cases</h2>
                <p>{totalCase.current}</p>
                <p>{`+${totalCase.increased}`}</p>
            </div>
            <div>
                <h2>Total Deaths</h2>
                <p>{totalDeath.current}</p>
                <p>{`+${totalDeath.increased}`}</p>
            </div>
        </div>
    )
}

export default LandingPage;