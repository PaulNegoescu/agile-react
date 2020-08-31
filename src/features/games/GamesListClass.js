import React from 'react';
import Game from './Game';

export default class GamesList extends React.Component {
    state = {
        games: []
    };

    // Lifecycle Methods
    async componentDidMount() {
        const games = await fetch('https://games-app-siit.herokuapp.com/games').then(res => res.json());
        this.setState({
            games
        });
    }

    componentWillUnmount() {
        // cleanup
    }

    render() {
        const { games } = this.state;
        // const games = this.state.games;
        if(!games.length) {
            return 'Loading ...';
        }

        return (
            <>
                <h1>Games</h1>
                <dl>
                    { games.map(game => <Game game={game} />) }
                </dl>
            </>
        );
    }
}