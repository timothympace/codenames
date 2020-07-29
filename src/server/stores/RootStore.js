import { decorate, observable } from 'mobx';
import { RoomStore } from './RoomStore';
import { GameStore } from './games/GameStore';
import { SubscriptionStore } from './SubscriptionStore';

export class RootStore {
  constructor() {
    this.roomStore = new RoomStore(this);
    this.gameStore = new GameStore(this);
    this.subscriptionStore = new SubscriptionStore(this);
  }
}

decorate(RootStore, {});
