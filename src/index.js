import React from "react";
import ReactDOM from "react-dom";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./styles.css";

const FORM = {
    NAMES: {
        EMAIL: 'email',
        FIRSTNAME: 'firstName',
        LASTNAME: 'lastName',
        JOBTYPE: 'jobType',
        TOC: 'termsAndConditions'
    }
}

const initialValues = {
    email: "ben.sullivan@wpengine.com",
    firstName: "Ben",
    lastName: 'Sullivan',
    jobType: 'development'
}

const clearValues = {
    email: '',
    firstName: '',
    lastName: '',
    jobType: ''
}

const SignupForm = ({ initialValues }) => {
    return (
        <Formik
            initialValues={{
                [FORM.NAMES.EMAIL]: initialValues.email || '',
                [FORM.NAMES.FIRSTNAME]: initialValues.firstName || '',
                [FORM.NAMES.LASTNAME]: initialValues.lastName || '',
                [FORM.NAMES.JOBTYPE]: initialValues.jobType || '',
                [FORM.NAMES.TOC]: false
            }}
            validationSchema={Yup.object({
                termsAndConditions: Yup.boolean()
                    .required("Required")
                    .oneOf([true], "You must accept the terms and conditions"),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                firstName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                jobType: Yup.string()
                    .oneOf(["designer", "development", "product", "other"],
                        "Invalid Job Type")
                    .required("Required"),
                lastName: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
            })}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    console.log(values)
                    console.table(actions)
                    actions.setSubmitting(false)
                }, 2000);
            }}
            handleReset={(actions) => {
                console.log("Form Reset!")
                actions.resetForm()
            }}
        >
            {({ isSubmitting }) =>
                <Form>
                    <button type="reset">Reset Form</button>
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text" placeholder="First Name" />
                    <ErrorMessage name="firstName" />

                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" placeholder="Last Name" />
                    <ErrorMessage name="lastName" />

                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" placeholder="email@email.com" />
                    <ErrorMessage name="email" />

                    <label htmlFor="jobType">Job Type</label>
                    <Field as="select" name="jobType">
                        <option value="">Select a job type</option>
                        <option value="designer">Designer</option>
                        <option value="development">Developer</option>
                        <option value="product">Product Manager</option>
                        <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="jobType" />

                    <label>
                        <Field name="termsAndConditions" type="checkbox" />
                        I accept the terms and conditions
                    </label>
                    <ErrorMessage name="termsAndConditions" />

                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            }
        </Formik >
    );
};

function App() {
    return <SignupForm initialValues={initialValues} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
