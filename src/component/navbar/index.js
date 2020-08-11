import React from "react";

export const NavBar = (props) => {

    return (
        <nav className="uk-navbar-container" data-uk-navbar>
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
        <li className={props.className}><a href="#" data-Index={props.dataIndex} onClick={props.handleClick}>{props.title}</a></li>
    )
}