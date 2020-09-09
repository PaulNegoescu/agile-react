import React from 'react'
import { Link } from 'react-router-dom';

export default function Game({ game }) {
    // const { game } = props;
    // const game = props.game;
    return (
        <React.Fragment key={game._id}>
            <dt>
                <h2>
                    <Link to={`games/${game._id}`}>{ game.title }</Link>
                </h2>
            </dt>
            <dd>
                <img src={ game.imageUrl } alt="cover" width="100" />
                { game.description }
            </dd>
        </React.Fragment>
    );
}
