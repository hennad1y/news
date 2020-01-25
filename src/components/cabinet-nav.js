import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import {UserContext} from "context/userContext";


const CabinetNav = () => {

    const [, dispatch] = useContext(UserContext);

    const logout = e => {
        e.preventDefault();
        firebase.auth().signOut();
        dispatch({type: 'UNAUTHORIZED'});
    };

    return (
        <ul className="nav nav-pills flex-column cabinet-nav">
            <li className="nav-item">
                <NavLink className="nav-link" to="/news">News</NavLink>
            </li>
            <li className="nav-item mt-auto">
                <a className="nav-link" href="/" onClick={logout}>Logout</a>
            </li>
        </ul>
    )
};

export default CabinetNav;