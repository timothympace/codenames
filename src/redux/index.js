// @flow

import { combineReducers } from '@reduxjs/toolkit';

import games from './games';
import lobby from './lobby';

export default combineReducers({
  games,
  lobby,
});
