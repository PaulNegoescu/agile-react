import React, { useContext } from 'react';
import Game from './Game';
import useApi from '../../hooks/useApi';
// import Error from '../../components/Error/Error';
import { ErrorContext } from '../../components/Error/ErrorContext';

export default function GamesList() {
    const [games] = useApi('games');
    const { message } = useContext(ErrorContext)

    // if(error) {
    //     return <Error message={ error } onReloadClicked={ triggerReload } />
    // }
    
    if(!games) {
        return <h1>Loading ...</h1>;
    }

    return (
        <>
            {message}
            <h1>Games</h1>
            <dl>
                { games.map(item => <Game key={item._id} game={item} />) }
            </dl>
        </>
    );
}
