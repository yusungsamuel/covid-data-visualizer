import React from "react";
import "./style.scss"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Odometer from 'react-odometerjs';

export const DataTable = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.headers.map((header, i) => {
                            return (
                                <TableCell
                                    style={{"font-weight":"bold"}}
                                >
                                    {header}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(props.rows).map((r, i) => {
                        let row = props.rows[r]
                        return (
                            <TableRow
                                key={i}
                            >
                                <TableCell>
                                    {r}
                                </TableCell>
                                <TableCell>
                                    {row? row.positive : null}
                                </TableCell>
                                <TableCell>
                                    {row? row.hospitalized : null}
                                </TableCell>
                                <TableCell>
                                    {row? row.death : null}
                                </TableCell>

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
            <p className="odometer current-number">{current}</p>
            <p className="increased-number">{`+${increased}`}</p>
        </div>
    )
};
