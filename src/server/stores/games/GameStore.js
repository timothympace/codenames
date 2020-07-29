import { Codenames } from './Codenames';

export class GameStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  createGame(type) {
    let game;

    switch (type) {
      case 'codenames':
        game = new Codenames();
        break;
      default:
        throw new Error('Unknown game');
    }

    this.rootStore.subscriptionStore.registerSubscribable(game);
    return game;
  }
}
