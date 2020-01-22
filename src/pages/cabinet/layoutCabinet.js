import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import {UserContext} from "context/userContext";

const LayoutCabinet = ({children}) => {

    const [userState] = useContext(UserContext);

    if(!userState.isLoggedIn) return <Redirect to="/"/>;

    return (
        <div className="container">
            <div className="row">
                {children}
            </div>
        </div>
    )
};

export default LayoutCabinet;