import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import GamesList from '../features/games/GamesList';
import GameDetails from '../features/games/GameDetails';

import ErrorContext from './Error/ErrorContext';

import 'bootstrap/dist/css/bootstrap.css';

function App(test) {
  const [message, setMessage] = useState('')
 
  return (
    <div className="container">
      <ErrorContext.Provider value={ {message, setMessage} }>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/games" component={GamesList} />
            <Route exact path="/games/:gameId" component={GameDetails} />
            <Route exact path="/" component={() => <h1>Homepage</h1>} />
            <Route component={() => <h1>404</h1>} />
          </Switch>
        </Router>
      </ErrorContext.Provider>
    </div>
  );
}

// Default export
export default App;
