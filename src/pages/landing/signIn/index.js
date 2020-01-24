import React, {useRef, useState} from "react";
import LayoutLanding from "pages/landing/layoutLanding";
import LandingForm from "components/landing-form";
import firebase from "firebase/app";
import "firebase/auth";

const SignIn = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const isActiveComponent = useRef(null);
    const textButton = 'Sign in';
    const titleForm = 'Sign in to Cabinet';
    const link = '/sign-up';
    const linkText = 'Create an account';

    const handlerSubmit = ({email, password}) => {
        setIsSubmitted(true);
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => isActiveComponent.current && setErrorMessage(error.message))
            .finally(() => isActiveComponent.current && setIsSubmitted(false));
    };

    return (
        <LayoutLanding form={true}>
            <div className="hide" ref={isActiveComponent}/>
            <LandingForm textButton={textButton}
                         titleForm={titleForm}
                         link={link}
                         linkText={linkText}
                         errorMessage={errorMessage}
                         isSubmitted={isSubmitted}
                         onSubmit={handlerSubmit}/>
        </LayoutLanding>
    )
};

export default SignIn;