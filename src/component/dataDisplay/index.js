import React from "react";
import "./style.scss"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export const DataDisplay = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {props.headers.map((header, i) => {
                            return (
                                <TableCell>
                                    {header}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, i) => {
                        return (
                            <TableRow
                                key={i}
                            >
                                {row.map((r, j) => {
                                    return (
                                        <TableCell
                                            key={j}
                                        >
                                            {r}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
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
