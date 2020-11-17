import React from "react";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "./style.scss"

export const NavBar = (props) => {

    return (
        <Paper
            square={true}
            style={{"background-color": "#219653"}}
        >
            <Tabs
                centered
            >
                {props.options.map((option, i)=>{
                    return (
                        <Tab 
                            onClick={()=>{props.click(i)}}
                            key={option}
                            label={option}
                        />
                    )
                })}
            </Tabs>
        </Paper>

    )
};

export const NavItem = (props) => {
    return (
        <li className={props.className}><a className="uk-link-reset" href="#" data-Index={props.dataIndex} onClick={props.handleClick}>{props.title}</a></li>
    )
}