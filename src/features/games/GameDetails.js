import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null)

    useEffect(() => {
        async function getGame() {
            const data = await fetch(`https://games-app-siit.herokuapp.com/games/${gameId}`).then(res => res.json());
            setGame(data);
        }

        getGame();
    }, [gameId]);

    if(!game) {
        return <h1>Loading ...</h1>;
    }

    return (
        <div>
            <h1>{ game.title }</h1>
        </div>
    )
}
