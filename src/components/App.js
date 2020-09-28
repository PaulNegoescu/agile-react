import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as firebase from "firebase/app";

import Navbar from './Navbar';
import GamesList from '../features/games/GamesList';
import GameDetails from '../features/games/GameDetails';
import ErrorContextProvider from './Error/ErrorContext';
import Error from './Error/Error';
import LoginRegister from '../features/auth/LoginRegister';

import 'bootstrap/dist/css/bootstrap.css';
import { AuthContextProvider } from '../features/auth/AuthContext';

const firebaseConfig = {
  apiKey: "AIzaSyBgeVpl29Y5wridfJAt8YE56XFE7YdQkJc",
  authDomain: "agile-test-40d7c.firebaseapp.com",
  databaseURL: "https://agile-test-40d7c.firebaseio.com",
  projectId: "agile-test-40d7c",
  storageBucket: "agile-test-40d7c.appspot.com",
  messagingSenderId: "251790265754",
  appId: "1:251790265754:web:7b1627c4c32d387453be23"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function App(test) { 
  return (
    <div className="container">
      <AuthContextProvider>
      <ErrorContextProvider>
        <Error />
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/games" component={GamesList} />
            <Route exact path="/games/:gameId" component={GameDetails} />
            <Route exact path="/login" component={LoginRegister} />
            <Route exact path="/register" component={LoginRegister} />
            <Route exact path="/" component={() => <h1>Homepage</h1>} />
            <Route component={() => <h1>404</h1>} />
          </Switch>
        </Router>
      </ErrorContextProvider>
      </AuthContextProvider>
    </div>
  );
}

// Default export
export default App;
