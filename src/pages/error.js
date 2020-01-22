import React from "react";
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <Link to="/">Home</Link>
            </div>
            <div className="row">
                <div>
                    Error
                </div>
            </div>
        </div>
    )
};

export default Error;