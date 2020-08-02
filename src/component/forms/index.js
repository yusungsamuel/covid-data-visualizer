import React from "react";

export function DropDown(props) {
    return (
        <form>
            <select class="uk-select">
                {props.children}
            </select>
        </form>
    )

}

export function Option (props) {
    return (
    <option>{props.option.toUpperCase()}</option>
    )
}