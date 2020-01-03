import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Lobby from './pages/lobby';
import Game from './pages/game';

function Codenames() {
  // useEffect(() => {
  //   dispatch(createGame());
  // }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/game/:id">
          <Game />
        </Route>
        <Route path="/">
          <Lobby />
        </Route>
      </Switch>
    </Router>
  );
}

export default hot(Codenames);
