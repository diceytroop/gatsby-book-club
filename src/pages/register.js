import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, ErrorMessage } from '../components/Common'
import { FirebaseContext } from '../components/Firebase'

const Register = () => {


    const { firebase } = useContext(FirebaseContext)
    const [errorMessage, setErrorMessage] = useState('');

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    })

    let isMounted = true;

    useEffect(() => {
        return () => {
            isMounted = false;
        }
    }, [])

    function handleInputChange(e) {
        e.persist();
        setErrorMessage('');
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (formValues.password === formValues.confirmPassword) {
            firebase.register({
                email: formValues.email,
                password: formValues.password,
                username: formValues.username
            }).catch(error => { 
                if (isMounted) {
                    setErrorMessage(error.message)
                } 
            })
        } else {
            setErrorMessage('Password and confirm password fields must match')
        }
    }

    return (
        <Form onSubmit={handleSubmit} >
            <Input required onChange={handleInputChange} value={formValues.username} name="username" placeholder="username" type="username" required/>
            <Input required onChange={handleInputChange} value={formValues.email} name="email" placeholder="email" type="email" required/>
            <Input required onChange={handleInputChange} value={formValues.password} name="password" placeholder="password" type="password" required minLength={6}/>
            <Input required onChange={handleInputChange} value={formValues.confirmPassword} name="confirmPassword" placeholder="confirm password" type="password" required minLength={6}/>
            <Button type="submit" block>
                Register
            </Button>
            {!!errorMessage &&
                <ErrorMessage>{errorMessage}</ErrorMessage>
            }
        </Form>

    )
}

export default Register