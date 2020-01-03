import uuid from 'uuid/v4.js';
import cards from '../config/cards.js';
import agents, { RED_AGENT, BLUE_AGENT } from '../config/agents.js';
import shuffle from '../utils/shuffle.js';

export default function createGame() {
  const id = uuid();

  // Shuffle all words in the deck, pull 25, choose
  // a side of the card at random.
  const words = shuffle(cards)
    .slice(0, 25)
    .map(c => c[Math.random() > 0.5 ? 'front' : 'back']);

  // Determine who goes first and shuffle the double agent
  // into the agent deck. The shuffled agents represents
  // the game key.
  const first = Math.random() > 0.5 ? RED_AGENT : BLUE_AGENT;
  const key = shuffle([...agents, first]);

  // Build a game board out of the words and the key
  // and initialize all the cards to not be revealed.
  const board = words.map((word, index) => ({
    word,
    agent: key[index],
    revealed: false,
  }));

  const game = {
    id,
    first,
    board,
  };

  return {
    type: 'CREATE_GAME',
    payload: game,
  };
}
