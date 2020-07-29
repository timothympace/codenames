import { action, decorate, observable } from 'mobx';
import { Room } from './Room';

// TODO
export class RoomStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rooms = {};
  }

  createRoom() {
    const room = new Room();
    this.rooms[room.id] = room;
    this.rootStore.subscriptionStore.registerSubscribable(room);
    return room;
  }

  deleteRoom(id) {
    delete this.rooms[id];
  }
}

decorate(RoomStore, {
  rooms: observable,

  createRoom: action.bound,
  deleteRoom: action.bound,
});
