import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import {UserContext} from "context/userContext";

import Loading from "components/loading";
import CabinetNav from "components/cabinet-nav";

const LayoutCabinet = ({children}) => {

    const [userState] = useContext(UserContext);

    if (userState.isLoading) return <Loading/>;
    if (!userState.isLoggedIn) return <Redirect to="/"/>;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <CabinetNav />
                </div>
                <div className="col-md-10">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default LayoutCabinet;