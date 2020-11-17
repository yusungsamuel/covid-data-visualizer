import React from "react";
import "./style.scss"

export const DataDisplay = (props) => {
    return (
        <div className="table">
            <div className="header">
                <div className="column">State</div>
                <div className="column">Numbers</div>
            </div>
            <div className="body">
                {props.children}
            </div>
        </div>
    )
}

export const TableRow = (props) => {
    return (
        <div className="row">
            <div className="column">{props.name}</div>
            <div className="column">{props.stat > 1000 ? `${props.stat / 1000}M` : `${props.stat}K`} </div>
        </div>
    )
}

export const DataCell = (props) => {
    
    const numberWithCommas = (x = 0) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let current = numberWithCommas(props.data.current)
    let increased = numberWithCommas(props.data.increased)

    return (
        <div className="data-cell">
            <h2>{props.title}</h2>
            <p className="current-number">{current}</p>
            <p className="increased-number">{`+${increased}`}</p>
        </div>
    )
};
