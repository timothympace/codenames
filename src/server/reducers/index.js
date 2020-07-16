import { combineReducers } from '@reduxjs/toolkit';
import games from './games';
import rooms from './rooms';

export default combineReducers({
  games,
  rooms,
});
