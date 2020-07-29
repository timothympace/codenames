import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Lobby from './pages/lobby';
import Game from './games/codenames';
import SessionRoute from './components/SessionRoute';

function App() {
  return (
    <Router>
      <Switch>
        <SessionRoute path="/room/:id">
          <Game />
        </SessionRoute>
        <Route path="/">
          <Lobby />
        </Route>
      </Switch>
    </Router>
  );
}

export default hot(App);
