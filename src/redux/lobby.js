import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchGames = createAsyncThunk('games/fetchall', async () => {
  const response = await fetch('/api/games');
  return response.json();
});

const lobbySlice = createSlice({
  name: 'lobby',
  initialState: {},
  extraReducers: {
    [fetchGames.fulfilled]: (state, action) => {
      state.games = action.payload;
    },
  },
});

export default lobbySlice.reducer;
