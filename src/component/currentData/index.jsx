import React, { useEffect, useState } from "react";
import { DataCell, DataTable } from "../dataDisplay"
import "./style.scss";
import covidData from "../../utilities/API"
import Choropleth from "../choropleth"
import stateConversion from "../../state-conversion.json"

const CurrentData = () => {
    const [totalCase, setTotalCase] = useState({});
    const [totalDeath, setTotalDeath] = useState({});
    const [viewingState, setViewingState] = useState("California")
    const [statesData, setStatesData] = useState([])
    useEffect(() => {
        const fetchData = (async () => {
            const usData = (await covidData.usCurrent()).data[0]
            setTotalDeath(
                {
                    current: usData.death,
                    increased: usData.deathIncrease
                }
            )
            setTotalCase(
                {
                    current: usData.positive,
                    increased: usData.positiveIncrease
                }
            )
            const stateData = (await covidData.allStateCurrent()).data
            let allStateData = {}
            stateData.forEach((s) => {
                if (s.state !== "AS" && s.state !== "GU" && s.state !== "MP" && s.state !== "PR" && s.state !== "VI" && s.state !== "DC") {
                    const state = stateConversion[s.state]

                    allStateData[state] =
                    {
                        positive: s.positive,
                        death: s.death,
                        hospitalized: s.hospitalizedCurrently
                    }
                }
            })
            setStatesData(allStateData)
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
            <DataTable
                headers={["State", "Positive", "Hospitalized", "Death"]}
                rows={{[viewingState]:statesData[viewingState]}}
            > 
            </DataTable>
            <Choropleth
                handleClick={setViewingState}
            ></Choropleth>

            <DataTable
                headers={["State", "Positive", "Hospitalized", "Death"]}
                rows={statesData}
            >
            </DataTable>

        </>
    )
}

export default CurrentData;