// @flow

import { combineReducers } from 'redux/es/redux.mjs';
import games from './games.js';
import lobby from './lobby.js';

export default combineReducers({
  games,
  lobby,
});
