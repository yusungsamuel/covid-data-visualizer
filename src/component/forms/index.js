import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export function DropDown(props) {
    return (
        <FormControl >
            <Select
                value={props.value}
                onChange={props.submit}
            >
                {props.children}
            </Select>
        </FormControl>
    )

}
