import {useContext, useEffect} from "react";

import {UserContext} from "context/userContext";
import {AUTHORIZED, UNAUTHORIZED, AUTH_STATE} from "types";
import useFirebase from "hooks/useFirebase";

const CheckedUser = ({children}) => {
    const [, dispatch] = useContext(UserContext);
    const [{response, errorMessage}, doOperationFirebase] = useFirebase();

    useEffect(() => {
        if (!response) return;
        dispatch({type: AUTHORIZED})
    }, [response, dispatch]);

    useEffect(() => {
        if (!errorMessage) return;
        dispatch({type: UNAUTHORIZED})
    }, [errorMessage, dispatch]);

    useEffect(() => {
        doOperationFirebase(AUTH_STATE);
    }, [doOperationFirebase]);

    return children
};

export default CheckedUser;