import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import ErrorContext from '../../components/Error/ErrorContext';

export default function Game({ game }) {
    // const { game } = props;
    // const game = props.game;
    const { setMessage } = useContext(ErrorContext)

    const handleClick = () => {
        setMessage('Testing out the Context');
    };

    return (
        <React.Fragment key={game._id}>
            <dt>
                <h2>
                    <Link to={`games/${game._id}`}>{ game.title }</Link>
                </h2>
            </dt>
            <dd>
                <img src={ game.imageUrl } alt="cover" width="100" onClick={handleClick} />
                { game.description }
            </dd>
        </React.Fragment>
    );
}
