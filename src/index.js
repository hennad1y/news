import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import {UserProvider} from "context/userContext";
import CheckedUser from "components/checkedUser";
import CheckedFavoritesNews from "components/checkedFavoritesNews";
import {NewsProvider} from "context/newsContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./styles.css";

import "./firebase";

import Routes from "routes";

const App = () => {
    return (
        <UserProvider>
            <CheckedUser>
                <NewsProvider>
                    <CheckedFavoritesNews>
                        <Router>
                            <Routes/>
                        </Router>
                    </CheckedFavoritesNews>
                </NewsProvider>
            </CheckedUser>
        </UserProvider>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));
