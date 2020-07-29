import express from 'express';
import { RootStore } from '../stores/RootStore';

const router = express.Router();

const store = new RootStore();

router.post('/api/session', (req, res) => {
  req.session.name = req.body.name;
  res.send();
});

router.get('/api/rooms', (req, res) => {
  res.send(JSON.stringify(Object.values(store.roomStore.rooms)));
});

router.get('/api/rooms/create', (req, res) => {
  const room = store.roomStore.createRoom();
  res.json(room);
});

router.get('/api/rooms/:roomId/creategame', (req, res) => {
  const { roomId } = req.params;
  const room = store.roomStore.rooms[roomId];
  const game = store.gameStore.createGame('codenames');

  if (room.gameId) {
    delete store.subscriptionStore.subscriptions[room.gameId];
  }

  room.setGameId(game.id);
  res.json(game);
});

router.ws('/wsapi/subscribe/:subscriptionId', (ws, req) => {
  const { subscriptionId } = req.params;
  store.subscriptionStore.subscribeToObservable(subscriptionId, ws, req);
});

export default router;
