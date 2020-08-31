import React, { Component } from 'react';
import styles from './Counter.module.css';

class Counter extends Component {
    state = {
        counterValue: 4
    };

    handleDecrement = () => {
        this.setState({
            counterValue: this.state.counterValue - 1 
        });
    }

    render() {
        return (
            <>
                <h1>Counter</h1>
                <strong className={styles['counter-display']}>
                    {this.state.counterValue}
                </strong>
                <button 
                    onClick={this.handleDecrement}
                    className={styles['counter-button']}>
                    -
                </button>
                <button className={styles['counter-button']}>
                    +
                </button>
            </>
        );
    }
}

export default Counter;