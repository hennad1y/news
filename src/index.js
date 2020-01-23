import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {UserProvider} from "context/userContext";

import "bootstrap/dist/css/bootstrap.min.css";

import "./firebase";

import Routes from "routes";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes/>
            </Router>
        </UserProvider>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));
