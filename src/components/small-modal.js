import React, {useContext} from "react";
import {UserContext} from "context/userContext";

const SmallModal = () => {
    const [userState] = useContext(UserContext);
    return (
        <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                    {userState.message}
                </div>
            </div>
        </div>
    )
};

export default SmallModal;