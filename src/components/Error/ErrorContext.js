import React from 'react'

const ErrorContext = React.createContext({
    message: '',
    setMessage() {}
});

export default ErrorContext;