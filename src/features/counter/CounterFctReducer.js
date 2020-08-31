import React, { useReducer } from 'react';
import styles from './Counter.module.css';

function Counter() {
    const [counterValue, dispatch] = useReducer(reducer, 0);

    function reducer(state, action) {
        switch(action.type) {
            case 'COUNTER':
                return state + action.payload;
            default:
                return state;
        }
    }
    
    return (
        <>
            <h1>Counter</h1>
            <strong className={styles['counter-display']}>
                {counterValue}
            </strong>
            <button 
                onClick={() => dispatch({type: 'COUNTER', payload: -1})}
                className={styles['counter-button']}>
                -
            </button>
            <button 
                onClick={() => dispatch({type: 'COUNTER', payload: 1})}
                className={styles['counter-button']}>
                +
            </button>
        </>
    );
}

export default Counter;