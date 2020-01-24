import React from "react";
import {Link} from "react-router-dom";
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .required('Required')
});

const LandingForm = ({textButton, titleForm, link, linkText, errorMessage, isSubmitted, onSubmit}) => {
    return (
        <Formik
            initialValues={{
                email: 'test@gmail.com',
                password: 'testtest'
            }}
            validationSchema={SignupSchema}
            onSubmit={values => onSubmit(values)}
        >
            {({errors, touched}) => (
                <Form className="landing-form">
                    <h2 className="mb-3">{titleForm}</h2>
                    {errorMessage && (
                        <div className="mb-3 text-sm-left text-danger">{errorMessage}</div>
                    )}
                    <fieldset className="form-group">
                        <Field name="email"
                               type="email"
                               autoComplete="off"
                               className="form-control"
                               placeholder="Email"/>

                        {errors.email && touched.email && (
                            <small className="form-text text-danger">{errors.email}</small>
                        )}
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password"
                               type="password"
                               autoComplete="off"
                               className="form-control"
                               placeholder="Password"/>

                        {errors.password && touched.password && (
                            <small className="form-text text-danger">{errors.password}</small>
                        )}
                    </fieldset>

                    <fieldset>
                        <button type="submit" className="btn btn-primary float-xl-right" disabled={isSubmitted}>{textButton}</button>
                    </fieldset>

                    <hr/>

                    <fieldset>
                        <Link to={link} type="button" className="btn btn-lg w-100 border">
                            <small>{linkText}</small>
                        </Link>
                    </fieldset>
                </Form>
            )}
        </Formik>
    )
};

export default LandingForm;