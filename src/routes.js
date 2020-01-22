import React from "react";
import {Switch, Route} from "react-router-dom";

import Home from "pages/landing/home";
import SignIn from "pages/landing/signIn";
import SignUp from "pages/landing/signUp";

import Dashboard from "./pages/cabinet/dashboard";

import Error from "./pages/error";

export default () => {
    return (
        <Switch>
            {/*landing*/}
            <Route path="/" component={Home} exact/>
            <Route path="/sign-in" component={SignIn}/>
            <Route path="/sign-up" component={SignUp}/>

            {/*cabinet*/}
            <Route path="/dashboard" component={Dashboard}/>

            {/*error*/}
            <Route path="/" component={Error}/>
        </Switch>
    )
}