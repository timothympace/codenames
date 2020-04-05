import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reducer from '../redux';
import Codenames from './Codenames';

const initialState = {
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
