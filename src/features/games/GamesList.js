import React, { useState, useEffect } from 'react';
import Game from './Game';

export default function GamesList() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function getGames() {
            const data = await fetch('https://games-app-siit.herokuapp.com/games').then(res => res.json());
            setGames(data);
        }

        getGames();
    }, []);
    
    if(!games.length) {
        return 'Loading ...';
    }

    return (
        <>
            <h1>Games</h1>
            <dl>
                { games.map(item => <Game game={item} />) }
            </dl>
        </>
    );
}
