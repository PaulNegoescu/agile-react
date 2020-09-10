import React from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../../hooks/useApi';
import Error from '../../components/Error/Error';

export default function GameDetails() {
    const { gameId } = useParams();
    const [ game, error ] = useApi(`games/${gameId}`);

    if(error) {
        return <Error message={ error } />
    }

    if(!game) {
        return <h1>Loading ...</h1>;
    }

    console.log({game})

    return (
        <div>
            <h1>{ game.title }</h1>
        </div>
    )
}
