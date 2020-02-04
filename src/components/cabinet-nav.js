import React, {useContext, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {UserContext} from "context/userContext";
import useFirebase from "hooks/useFirebase";
import {UNAUTHORIZED, SIGN_OUT} from "types";

const CabinetNav = () => {

    const [, dispatch] = useContext(UserContext);
    const [{response}, doOperationFirebase] = useFirebase();

    useEffect(() => {
        if (!response) return;

        dispatch({type: UNAUTHORIZED})
    }, [response, dispatch]);

    const logout = () => doOperationFirebase(SIGN_OUT);

    return (
        <ul className="nav nav-pills flex-column cabinet-nav">
            <li className="nav-item">
                <NavLink className="nav-link" to="/news">News</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/favorites">Favorites</NavLink>
            </li>
            <li className="nav-item mt-auto logout" onClick={logout}>
                <i className="fa fa-sign-out"/>&nbsp;Logout
            </li>
        </ul>
    )
};

export default CabinetNav;