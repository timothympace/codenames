// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';
import Codenames from './Codenames';

type ApplicationState = {
  game?: {
    id: string,
    first: string,
    board: Array<{
      word: string,
      agent: string,
      revealed: boolean,
    }>,
    turn: {
      team: string,
      timerExpire: number,
      timerCooldown: number,
      clue: string,
      related: number,
    },
  },
  lobby: {
    games: Array<Object>,
  },
};

const initialState: ApplicationState = {
  lobby: {
    games: [],
  }
};

const store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Codenames />
  </Provider>,
  document.getElementById('root')
);
