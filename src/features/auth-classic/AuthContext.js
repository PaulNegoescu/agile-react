import React, { useEffect, useState } from 'react';

const initialValue = {
    isAuthenticated: false,
    userName: null,
    token: null,
}

const AuthContext = React.createContext(initialValue);

function AuthContextProvider({children}) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      const fromStorage = localStorage.getItem('movies-app:auth');
      if(fromStorage) {
        setValue(JSON.parse(fromStorage));
      }
    }, [])

    function onLogin(userName, token) {
      const newState = {
        isAuthenticated: true,
        userName,
        token
      };
      setValue(newState);
      localStorage.setItem('movies-app:auth', JSON.stringify(newState));
    }

    function onLogout() {
      setValue(initialValue);
      localStorage.removeItem('movies-app:auth');
    }

    return (
        <AuthContext.Provider value={ {...value, onLogin, onLogout} }>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider}