import React from "react";
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <ul className="nav nav-pills">
            <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>Home</NavLink>
            </li>
            <li className="nav-item float-right">
                <NavLink className="nav-link" to="/sign-in">Sign In</NavLink>
            </li>
            <li className="nav-item float-right">
                <NavLink className="nav-link" to="/sign-up">Sign Up</NavLink>
            </li>
        </ul>
    )
};

export default Nav;