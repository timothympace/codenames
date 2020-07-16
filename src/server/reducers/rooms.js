import { createReducer } from '@reduxjs/toolkit';

import { addPlayer, deletePlayer, addRoom, deleteRoom, setGameId } from '../actions/rooms';

export default createReducer(
  {},
  {
    [addRoom]: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    [deleteRoom]: (state, action) => {
      delete state[action.payload.id];
    },

    [addPlayer]: (state, action) => {
      const room = state[action.payload.id];
      room.players.push(action.payload.player);
    },

    [deletePlayer]: (state, action) => {
      const room = state[action.payload.id];
      room.players = room.players.filter(m => m !== action.payload.player);
    },

    [setGameId]: (state, action) => {
      state[action.payload.id] = action.payload.gameId;
    },
  }
);
