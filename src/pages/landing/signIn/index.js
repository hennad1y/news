import React from "react";
import LandingForm from "components/landing-form";
import useFirebase from "hooks/useFirebase";

const SignIn = () => {

    const [{errorMessage, isSubmitted}, doOperationFirebase] = useFirebase();
    const textButton = 'Sign in';
    const titleForm = 'Sign in to Cabinet';
    const link = '/sign-up';
    const linkText = 'Create an account';

    const handlerSubmit = ({email, password}) => doOperationFirebase('signIn', {email, password});

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