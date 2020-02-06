import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import {UserContext} from "context/userContext";

import Loading from "components/loading";
import CabinetNav from "components/cabinet-nav";
import SmallModal from "components/small-modal";

const LayoutCabinet = ({children}) => {

    const [userState] = useContext(UserContext);

    if (userState.isLoading) return <Loading/>;
    if (!userState.isLoggedIn) return <Redirect to="/"/>;

    return (
        <div className="container-fluid cabinet">
            <div className="row">
                <div className="sidebar">
                    <CabinetNav/>
                </div>
                <div className="main">
                    {children}
                </div>
                <SmallModal/>
            </div>
        </div>
    )
};

export default LayoutCabinet;