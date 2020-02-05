import {useCallback, useEffect, useState} from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {
    GET_FAVORITES,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
    AUTH_STATE,
    ADD_FAVORITE,
    GET_VALUES_FAVORITES,
    UPDATE_FAVORITE,
    SUBMITTED_DONE
} from "types";

export default () => {
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [response, setResponse] = useState(null);
    const [responseFavorites, setResponseFavorites] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const doOperationFirebase = useCallback((nameOperation = '', values = {
        email: '',
        password: '',
        title: '',
        favorites: {}
    }) => {
        setIsSubmitted(true);
        setData({nameOperation, values});
    }, [setIsSubmitted, setData]);

    useEffect(() => {
        if (!data) return;

        let isActive = true;
        const {email, password, title, favorites} = data.values;

        if (data.nameOperation === SIGN_IN) {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .catch(error => isActive && setErrorMessage(error.message))
                .finally(() => isActive && setIsSubmitted(false));
        }

        if (data.nameOperation === SIGN_UP) {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(error => isActive && setErrorMessage(error.message))
                .finally(() => isActive && setIsSubmitted(false));
        }

        if (data.nameOperation === SIGN_OUT) {
            firebase.auth().signOut().then(() => isActive && setResponse(true));
        }

        if (data.nameOperation === GET_FAVORITES) {
            const userUid = firebase.auth().currentUser.uid;

            firebase.database().ref(`/favorites/${userUid}`)
                .once('value', result => isActive && setResponse(result), error => isActive && setErrorMessage(error.message))
        }

        if (data.nameOperation === AUTH_STATE) {
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    setResponse(true);
                    setErrorMessage('');
                } else {
                    setResponse(false);
                    setErrorMessage('error')
                }

            });
        }

        if (data.nameOperation === SUBMITTED_DONE) {
            setIsSubmitted(false)
        }

        if (data.nameOperation === ADD_FAVORITE) {
            const userUid = firebase.auth().currentUser.uid;
            firebase.database().ref(`/favorites/${userUid}`).push({title})
        }

        if (data.nameOperation === GET_VALUES_FAVORITES) {
            const userUid = firebase.auth().currentUser.uid;
            firebase.database().ref(`/favorites/${userUid}`)
                .orderByChild('title')
                .once('value')
                .then(result => isActive && setResponseFavorites(result))
        }

        if (data.nameOperation === UPDATE_FAVORITE) {
            const userUid = firebase.auth().currentUser.uid;
            firebase.database().ref(`/favorites/${userUid}`).update(favorites);
        }

        return () => isActive = false;
    }, [data]);

    return [{errorMessage, isSubmitted, response, responseFavorites}, doOperationFirebase]
}