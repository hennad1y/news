import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import classNames from "classnames";

import LandingNav from "components/landing-nav";
import {UserContext} from "context/userContext";
import Loading from "components/loading";

const LayoutLanding = ({children}) => {

    const [userState] = useContext(UserContext);

    const pathname = window.location.pathname;
    const flag = pathname === '/sign-in' || pathname === '/sign-up';

    const classes = classNames({
        'row': true,
        'p-2': true,
        'justify-content-center': flag,
        'align-items-center': flag,
        'landing-form-wrapper': flag
    });

    if (userState.isLoading) return <Loading/>;
    if (userState.isLoggedIn) return <Redirect to="/news"/>;

    return (
        <div className="container mt-2 landing">
            <div className="row p-2">
                <LandingNav/>
            </div>
            <div className={classes}>
                {children}
            </div>
        </div>
    )
};

export default LayoutLanding;