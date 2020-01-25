import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import classNames from "classnames";

import LandingNav from "components/landing-nav";
import {UserContext} from "context/userContext";
import Loading from "components/loading";

const LayoutLanding = ({children, form = false}) => {

    const [userState] = useContext(UserContext);

    const classes = classNames({
        'row': true,
        'justify-content-center': form,
        'align-items-center': form,
        'landing-form-wrapper': form
    });

    if (userState.isLoading) return <Loading/>;
    if (userState.isLoggedIn) return <Redirect to="/news"/>;

    return (
        <div className="container mt-2 landing">
            <div className="row">
                <LandingNav/>
            </div>
            <div className={classes}>
                {children}
            </div>
        </div>
    )
};

export default LayoutLanding;