import { action, decorate, observable } from 'mobx';
import uuid from 'uuid/v4';
import shuffle from '../../../utils/shuffle';
import codenameCards from '../../../config/codenameCards';
import keyCards from '../../../config/keyCards';
import rotate2d from '../../../utils/rotate2d';
import { ASSASSIN, BLUE_AGENT, RED_AGENT } from '../../../config/constants';

export class Codenames {
  constructor() {
    this.id = uuid();

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
      agentIndex: key[index] === ASSASSIN ? 0 : Math.floor(Math.random() * 2),
      revealed: false,
    }));

    // Choose a random card from the starting team to be the double agent.
    const startingAgentCards = board.filter(({ agent }) => agent === currentTurn);
    startingAgentCards[Math.floor(Math.random() * startingAgentCards.length)].agentIndex = 2;

    this.currentTurn = currentTurn;
    this.board = board;
    this.timerExpire = Date.now() + 90 * 1000;
    this.timerPaused = Date.now();
  }

  revealCard({ word }) {
    const card = this.board.find(c => c.word === word);
    card.revealed = true;
  }

  startTimer() {
    this.timerExpire += Date.now() - this.timerPaused;
    this.timerPaused = null;
  }

  pauseTimer() {
    this.timerPaused = Date.now();
  }

  resetTimer({ time }) {
    this.timerExpire = Date.now() + time * 1000;
    if (this.timerPaused) {
      this.timerPaused = Date.now();
    }
  }
}

decorate(Codenames, {
  currentTurn: observable,
  board: observable,
  timerExpire: observable,
  timerPaused: observable,

  revealCard: action.bound,
  startTimer: action.bound,
  pauseTimer: action.bound,
  resetTimer: action.bound,
});
