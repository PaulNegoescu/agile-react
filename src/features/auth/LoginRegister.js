import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";

import { useForm } from '../../hooks';
import { AuthContext } from './AuthContext';
import { Redirect, useLocation } from 'react-router-dom';
import { ErrorContext } from '../../components/Error/ErrorContext';

export default function LoginRegister() {
    const { values, bindInput } = useForm(null);
    const { isAuthenticated } = useContext(AuthContext);
    const { pathname } = useLocation();
    const { setMessage } = useContext(ErrorContext)
    const isRegister = (pathname === '/register');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if(!isRegister) {
                await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
            } else {
                if(values && values.password === values.retype_password) {
                    await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);  
                } else {
                    setMessage('The two passwords must match!');
                }
            }
        } catch(e) {
            setMessage(e.message);
        }
    }

    if(isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <h1>{ !isRegister ? 'Login' : 'Register' }</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...bindInput('email')} />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...bindInput('password')} />
                </p>
                { isRegister && (
                    <p>
                        <label htmlFor="retype_password">Retype Password</label>
                        <input type="password" id="retype_password" {...bindInput('retype_password')} />
                    </p>
                )}
                <p>
                    <button type="submit">{ !isRegister ? 'Login' : 'Register' }</button>
                </p>
            </form>
        </div>
    )
}
