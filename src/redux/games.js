import uuid from 'uuid/v4';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import codenameCards from '../config/codenameCards';
import keyCards from '../config/keyCards';
import { RED_AGENT, BLUE_AGENT } from '../config/constants';
import shuffle from '../utils/shuffle';
import rotate2d from '../utils/rotate2d';

function prepareGame() {
  const id = uuid();

  // Shuffle all words in the deck, pull 25, choose
  // a side of the card at random.
  const words = shuffle(codenameCards)
    .slice(0, 25)
    .map(c => c[Math.random() > 0.5 ? 'front' : 'back']);

  // Pick a random key card and rotate it to a random orientation.
  // Determine who goes first based off the key cards number of
  // red/blue agents.
  let key = keyCards[Math.floor(Math.random() * keyCards.length)];
  key = rotate2d(key, Math.floor(Math.random() * 4));
  const currentTurn = key.filter(a => a === RED_AGENT).length === 9 ? RED_AGENT : BLUE_AGENT;

  // Build a game board out of the words and the key
  // and initialize all the cards to not be revealed.
  const board = words.map((word, index) => ({
    word,
    agent: key[index],
    agentIndex: Math.floor(Math.random() * 2),
    revealed: false,
  }));

  // Choose a random card from the starting team to be the double agent.
  const startingAgentCards = board.filter(({ agent }) => agent === currentTurn);
  startingAgentCards[Math.floor(Math.random() * startingAgentCards.length)].agentIndex = 2;

  const game = {
    id,
    currentTurn,
    board,
  };

  return { payload: game };
}

export const createNewGame = createAsyncThunk('games/create', async () => {
  const response = await fetch('/api/games/create');
  return await response.text();
});

const gamesSlice = createSlice({
  name: 'games',
  initialState: {},
  reducers: {
    createGame: {
      reducer(state, action) {
        state[action.payload.id] = action.payload;
      },
      prepare: prepareGame,
    },
    flipCard(state, action) {
      const game = state[action.payload.id];
      const card = game.board.find(({ word }) => word === action.payload.word);
      card.revealed = true;
    },
  },
  extraReducers: {
    [createNewGame.fulfilled]: (state, action) => {
      state[action.payload.id] = action.payload;
    },
  },
});

export const { createGame, flipCard } = gamesSlice.actions;

export default gamesSlice.reducer;
