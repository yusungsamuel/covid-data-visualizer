import React from "react";

export function DropDown(props) {
    return (
        <form onChange={props.submit}>
            <select>
                {props.children}
            </select>
        </form>
    )

}

export function Option (props) {
    return (
    <option value={props.option}>{props.option.toUpperCase()}</option>
    )
}