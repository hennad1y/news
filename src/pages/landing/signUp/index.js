import React from "react";
import LandingForm from "components/landing-form";
import useFirebase from "hooks/useFirebase";

const SignUp = () => {

    const [{errorMessage, isSubmitted}, doOperationFirebase] = useFirebase();
    const textButton = 'Sign up';
    const titleForm = 'Create an account';
    const link = '/sign-in';
    const linkText = 'Have an account?';

    const handlerSubmit = ({email, password}) => doOperationFirebase('signUp', {email, password});

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

export default SignUp;