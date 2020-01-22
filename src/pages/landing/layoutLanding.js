import React from "react";

import Nav from "components/landing/nav";

const LayoutLanding = ({children}) => {
    return (
        <div className="container mt-3">
            <div className="row">
                <Nav />
            </div>
            <div className="row">
                {children}
            </div>
        </div>
    )
};

export default LayoutLanding;