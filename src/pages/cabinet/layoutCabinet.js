import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import {UserContext} from "context/userContext";
import firebase from "firebase/app";
import "firebase/auth";

const LayoutCabinet = ({children}) => {

    const [userState] = useContext(UserContext);

    const logout = () => {
        firebase.auth().signOut()
            .then(function () {
                // Sign-out successful.
            })
            .catch(function (error) {
                // An error happened
            });
    };

    if (!userState.isLoggedIn) return <Redirect to="/"/>;

    return (
        <div className="container">
            <div className="row">
                {children}
                <button onClick={logout}>Log out</button>
            </div>
        </div>
    )
};

export default LayoutCabinet;