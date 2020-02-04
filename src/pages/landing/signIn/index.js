import React from "react";
import LandingForm from "components/landing-form";
import useFirebase from "hooks/useFirebase";
import {SIGN_IN} from "types";

const SignIn = () => {

    const [{errorMessage, isSubmitted}, doOperationFirebase] = useFirebase();
    const textButton = 'Sign in';
    const titleForm = 'Sign in to Cabinet';
    const link = '/sign-up';
    const linkText = 'Create an account';

    const handlerSubmit = ({email, password}) => doOperationFirebase(SIGN_IN, {email, password});

    return (
        <LandingForm textButton={textButton}
                     titleForm={titleForm}
                     link={link}
                     linkText={linkText}
                     errorMessage={errorMessage}
                     isSubmitted={isSubmitted}
                     onSubmit={handlerSubmit}/>
    )
};

export default SignIn;