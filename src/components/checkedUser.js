import {useContext, useEffect} from "react";
import firebase from "firebase/app";
import "firebase/auth";

import {UserContext} from "context/userContext";

const CheckedUser = ({children}) => {
    const [, dispatch] = useContext(UserContext);

    useEffect(() => {
        if (!firebase.auth().currentUser) {
            firebase.auth().onAuthStateChanged(user => {
                user && dispatch({type: 'AUTHORIZED'});
                !user && dispatch({type: 'UNAUTHORIZED'});
            });
        }
    }, [dispatch]);

    return children
};

export default CheckedUser;