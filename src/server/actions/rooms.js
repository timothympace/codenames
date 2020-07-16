import { createAction } from '@reduxjs/toolkit';

export const addRoom = createAction('addRoom');
export const deleteRoom = createAction('deleteRoom');

export const addPlayer = createAction('addPlayer');
export const deletePlayer = createAction('deletePlayer');

export const setGameId = createAction('setGameId');
