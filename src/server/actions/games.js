import { createAction } from '@reduxjs/toolkit';

export const addGame = createAction('addGame');
export const deleteGame = createAction('deleteGame');

export const revealCodenameCard = createAction('revealCodenameCard');

export const startGameTimer = createAction('startGameTimer');
export const pauseGameTimer = createAction('pauseGameTimer');
export const resetGameTimer = createAction('resetGameTimer');
