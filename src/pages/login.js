import React, { useState, useContext } from "react"
import { Link } from "gatsby"
import { FirebaseContext } from '../components/Firebase'
import { Form, Input, Button, ErrorMessage } from '../components/Common'

import SEO from "../components/seo"

const Login = () => {

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const { firebase } = useContext(FirebaseContext);
    
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        firebase.login({ email: formValues.email, password: formValues.password }).catch(error => {
            setErrorMessage(error.message);
        });
    }

    function handleInputChange(e) {
        e.persist()
        setErrorMessage('');
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <Input required name="email" onChange={handleInputChange} placeholder="email" type="email" value={formValues.email}/>
                <Input required name="password" onChange={handleInputChange} placeholder="password" type="password" value={formValues.password}/>
                <Button type="submit" block>
                    Login
                </Button>
                {!!errorMessage &&
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                }
            </Form>
        </section>
    )
}

export default Login
