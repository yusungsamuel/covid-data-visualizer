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
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.data.current}</p>
            <p>{`+${props.data.increased}`}</p>
        </div>
    )
};
