import { createReducer } from '@reduxjs/toolkit';

import {
  addGame,
  deleteGame,
  pauseGameTimer,
  resetGameTimer,
  revealCodenameCard,
  startGameTimer,
} from '../actions/games';

export default createReducer(
  {},
  {
    [addGame]: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    [deleteGame]: (state, action) => {
      delete state[action.payload.id];
    },

    [revealCodenameCard]: (state, action) => {
      const game = state[action.payload.id];
      const card = game.board.find(({ word }) => word === action.payload.word);
      card.revealed = true;
    },

    [startGameTimer]: (state, action) => {
      const game = state[action.payload.id];
      game.timerExpire += Date.now() - game.timerPaused;
      game.timerPaused = null;
    },
    [pauseGameTimer]: (state, action) => {
      const game = state[action.payload.id];
      game.timerPaused = Date.now();
    },
    [resetGameTimer]: (state, action) => {
      const game = state[action.payload.id];
      game.timerExpire = Date.now() + action.payload.time * 1000;
      if (game.timerPaused) {
        game.timerPaused = Date.now();
      }
    },
  }
);
