import React, { useState } from 'react';
import styles from './Counter.module.css';

function Counter() {
    const [counterValue, setCounterValue] = useState(0);
    
    const handleButtonClick = (diff) => {
        // setCounterValue(counterValue + diff);
        setCounterValue((state) => state + diff); // seamana mai tare cu sintaxa de la reducere
    };
    
    return (
        <>
            <h1>Counter</h1>
            <strong className={styles['counter-display']}>
                {counterValue}
            </strong>
            <button 
                onClick={() => handleButtonClick(-1)}
                className={styles['counter-button']}>
                -
            </button>
            <button 
                onClick={() => handleButtonClick(1)}
                className={styles['counter-button']}>
                +
            </button>
        </>
    );
}

export default Counter;