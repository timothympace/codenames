import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Lobby from './pages/lobby';
import Room from './pages/room';
import SessionRoute from './components/SessionRoute';

function Codenames() {
  return (
    <Router>
      <Switch>
        <SessionRoute path="/room/:id">
          <Room />
        </SessionRoute>
        <Route path="/">
          <Lobby />
        </Route>
      </Switch>
    </Router>
  );
}

export default hot(Codenames);
