import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { useForm } from '../../hooks';
import { AuthContext } from './AuthContext';
import { ErrorContext } from '../../components/Error/ErrorContext';

const baseUrl = 'https://movies-app-siit.herokuapp.com';


export default function LoginRegister() {
    const { values, bindInput } = useForm(null);
    const { isAuthenticated, onLogin } = useContext(AuthContext);
    const { pathname } = useLocation();
    const { setMessage } = useContext(ErrorContext)
    const isRegister = (pathname === '/register-classic');
    
    
    async function makeRequest(endpoint, values) {
        try {
            const { accessToken, message } = await fetch(baseUrl + '/auth/' + endpoint, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(values),
            }).then(res => res.json());

            setMessage(message);
            if(accessToken) {
                onLogin(values.username, accessToken);
            }
        } catch(e) {
            setMessage(e.message);
        }
    }
    

    function handleSubmit(e) {
        e.preventDefault();
        
        if(!isRegister) {
            // Login
            makeRequest('login', values);

        } else {
            // Register
            if(values && values.password === values.retype_password) {
                makeRequest('register', values);
            } else {
                setMessage('The two passwords must match!');
            }
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
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...bindInput('username')} />
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
