import React from "react";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./style.scss"

export function DropDown(props) {
    return (
        <FormControl
            color="primary"
        >
            <Select
                value={props.value}
                onChange={props.submit}
            >
                {props.children}
            </Select>
        </FormControl>
    )

}
