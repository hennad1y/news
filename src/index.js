import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import {UserProvider} from "context/userContext";
import CheckedUser from "components/checkedUser";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import "./firebase";

import Routes from "routes";

const App = () => {
    return (
        <UserProvider>
            <CheckedUser>
                <Router>
                    <Routes/>
                </Router>
            </CheckedUser>
        </UserProvider>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));
