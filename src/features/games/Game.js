import React from 'react'

export default function Game({ game }) {
    // const { game } = props;
    // const game = props.game;
    return (
        <React.Fragment key={game._id}>
            <dt><h2><a href="gameDetails/id">{ game.title }</a></h2></dt>
            <dd>
                <img src={ game.imageUrl } alt="cover" width="100" />
                { game.description }
            </dd>
        </React.Fragment>
    )
}
