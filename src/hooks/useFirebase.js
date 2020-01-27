import {useCallback, useEffect, useState} from "react";
import firebase from "firebase/app";
import "firebase/auth";

export default () => {
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const doOperationFirebase = useCallback((nameOperation = '', values = {email: '', password: ''}) => {
        setIsSubmitted(true);
        setData({nameOperation, values});
    }, [setIsSubmitted, setData]);

    useEffect(() => {
        if (!data) return;

        let isActive = true;
        const {email, password} = data.values;

        if (data.nameOperation === 'signIn') {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .catch(error => isActive && setErrorMessage(error.message))
                .finally(() => isActive && setIsSubmitted(false));
        }

        if (data.nameOperation === 'signUp') {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(error => isActive && setErrorMessage(error.message))
                .finally(() => isActive && setIsSubmitted(false));
        }

        if (data.nameOperation === 'signOut') firebase.auth().signOut();

        return () => isActive = false;
    }, [data]);

    return [{errorMessage, isSubmitted}, doOperationFirebase]
}