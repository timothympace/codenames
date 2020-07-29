import { action, decorate, observable } from 'mobx';
import uuid from 'uuid/v4';

export class Room {
  constructor() {
    this.id = uuid();
    this.gameId = null;
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  deletePlayer(player) {
    this.players = this.players.filter(p => p !== player);
  }

  setGameId(gameId) {
    this.gameId = gameId;
  }

  onSubscribe(req) {
    this.addPlayer(req.session.name);
  }

  onUnsubscribe(req) {
    this.deletePlayer(req.session.name);
  }
}

decorate(Room, {
  gameId: observable,
  players: observable.shallow,

  addPlayer: action.bound,
  deletePlayer: action.bound,
  setGameId: action.bound,
});
