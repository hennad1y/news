import React, {useRef, useState} from "react";
import LandingForm from "components/landing-form";
import firebase from "firebase/app";
import "firebase/auth";

const SignUp = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const isActiveComponent = useRef(null);
    const textButton = 'Sign up';
    const titleForm = 'Create an account';
    const link = '/sign-in';
    const linkText = 'Have an account?';

    const handlerSubmit = ({email, password}) => {
        setIsSubmitted(true);
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => isActiveComponent.current && setErrorMessage(error.message))
            .finally(() => isActiveComponent.current && setIsSubmitted(false));
    };

    return (
        <>
            <div className="hide" ref={isActiveComponent}/>
            <LandingForm textButton={textButton}
                         titleForm={titleForm}
                         link={link}
                         linkText={linkText}
                         errorMessage={errorMessage}
                         isSubmitted={isSubmitted}
                         onSubmit={handlerSubmit}/>
        </>
    )
};

export default SignUp;