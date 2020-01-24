import React from "react";
import {NavLink} from "react-router-dom";

const LandingNav = () => {
    return (
        <ul className="nav nav-pills w-100">
            <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>Home</NavLink>
            </li>
            <li className="nav-item mr-2 ml-auto">
                <NavLink className="nav-link" to="/sign-in">Sign in</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/sign-up">Sign up</NavLink>
            </li>
        </ul>
    )
};

export default LandingNav;