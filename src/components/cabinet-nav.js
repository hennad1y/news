import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {UserContext} from "context/userContext";
import useFirebase from "hooks/useFirebase";

const CabinetNav = () => {

    const [, dispatch] = useContext(UserContext);
    const [, doOperationFirebase] = useFirebase();

    const logout = async () => {
        await doOperationFirebase('signOut');
        dispatch({type: 'UNAUTHORIZED'});
    };

    return (
        <ul className="nav nav-pills flex-column cabinet-nav">
            <li className="nav-item">
                <NavLink className="nav-link" to="/news">News</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/favorites">Favorites</NavLink>
            </li>
            <li className="nav-item mt-auto logout" onClick={logout}>
                <i className="fa fa-sign-out" />&nbsp;Logout
            </li>
        </ul>
    )
};

export default CabinetNav;