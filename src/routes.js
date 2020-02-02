import React from "react";
import {Switch, Route} from "react-router-dom";

import LayoutLanding from "pages/landing/layoutLanding";
import Home from "pages/landing/home";
import SignIn from "pages/landing/signIn";
import SignUp from "pages/landing/signUp";

import {NewsProvider} from "context/newsContext";
import LayoutCabinet from "pages/cabinet/layoutCabinet";
import News from "pages/cabinet/news";
import NewsMore from "pages/cabinet/newsMore";

import Error from "pages/error";

const withLayoutLanding = Component => props => <LayoutLanding><Component {...props} /></LayoutLanding>;
const withLayoutCabinet = Component => props => <LayoutCabinet><Component {...props} /></LayoutCabinet>;

export default () => {
    return (
        <Switch>
            {/*landing*/}
            <Route path="/" component={withLayoutLanding(Home)} exact/>
            <Route path="/sign-in" component={withLayoutLanding(SignIn)}/>
            <Route path="/sign-up" component={withLayoutLanding(SignUp)}/>


            {/*cabinet*/}
            <NewsProvider>
                <Route path="/news" component={withLayoutCabinet(News)} exact/>
                <Route path="/news/:slug" component={withLayoutCabinet(NewsMore)}/>
            </NewsProvider>

            {/*error*/}
            <Route component={Error}/>
        </Switch>
    )
}