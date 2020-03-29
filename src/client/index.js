// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reducer from '../redux';
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
  },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

ReactDOM.render(
  <Provider store={store}>
    <Codenames />
  </Provider>,
  document.getElementById('root')
);
