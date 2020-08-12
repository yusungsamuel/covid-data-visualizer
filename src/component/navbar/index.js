import React from "react";
import "./style.scss"

export const NavBar = (props) => {

    return (
        <nav className="navbar uk-navbar-transparent uk-navbar-container" data-uk-navbar>
            <div className="uk-navbar-center">
                <ul className="uk-navbar-nav">
                    {props.children}
                </ul>
            </div>
        </nav>

    )
};

export const NavItem = (props) => {
    return (
        <li className={props.className}><a className="uk-link-reset" href="#" data-Index={props.dataIndex} onClick={props.handleClick}>{props.title}</a></li>
    )
}