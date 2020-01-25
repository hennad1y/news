import React from "react";
import {Switch, Route} from "react-router-dom";

import Home from "pages/landing/home";
import SignIn from "pages/landing/signIn";
import SignUp from "pages/landing/signUp";

import News from "pages/cabinet/news";
import NewsMore from "pages/cabinet/newsMore";

import Error from "pages/error";

export default () => {
    return (
        <Switch>
            {/*landing*/}
            <Route path="/" component={Home} exact/>
            <Route path="/sign-in" component={SignIn}/>
            <Route path="/sign-up" component={SignUp}/>

            {/*cabinet*/}
            <Route path="/news" component={News} exact/>
            <Route path="/news/:slug" component={NewsMore}/>

            {/*error*/}
            <Route component={Error}/>
        </Switch>
    )
}