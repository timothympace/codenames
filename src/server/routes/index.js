import express from 'express';
import watch from 'redux-watch';
import uuid from 'uuid/v4';
import { dispatch, store } from '../store';
import { addPlayer, addRoom, deletePlayer } from '../actions/rooms';

const router = express.Router();

router.post('/api/session', (req, res) => {
  req.session.name = req.body.name;
  res.send();
});

router.get('/api/rooms', (req, res) => {
  res.send(JSON.stringify(Object.values(store.getState().rooms)));
});

router.get('/api/rooms/create', (req, res) => {
  const room = { id: uuid(), players: [] };
  dispatch(addRoom(room));
  res.json(room);
});

router.ws('/wsapi/rooms/:id', (ws, req) => {
  const { id } = req.params;

  // Add this connection to the rooms list of players.
  store.dispatch(addPlayer({ id, player: req.session.name }));

  // Allow client to dispatch actions directly.
  ws.onmessage = msg => {
    const payload = JSON.parse(msg.data);
    dispatch(payload);
  };

  const sendMessage = message => {
    ws.send(JSON.stringify(message));
  };

  const room = store.getState().rooms[id];
  sendMessage(room);

  const watcher = watch(store.getState, `rooms.${id}`);
  const handleUpdates = watcher(newVal => sendMessage(newVal));
  const unsubscribe = store.subscribe(handleUpdates);

  // When the websocket closes, remove this player from the room.
  ws.onclose = () => {
    unsubscribe();
    store.dispatch(deletePlayer({ id, player: req.session.name }));
  };
});

export default router;
