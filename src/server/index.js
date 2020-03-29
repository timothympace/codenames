import express from 'express';
import expressWs from 'express-ws';
import { configureStore } from '@reduxjs/toolkit';
import watch from 'redux-watch';
import { createGame } from '../redux/games';
import reducer from '../redux';
import update from 'immutability-helper';

const store = configureStore({
  reducer,
});
const { dispatch } = store;

const app = express();
expressWs(app);
const port = 8086;

app.listen(port, () => {
  console.log(`Server bound to port ${port}`);
});

app.get('/api/games/create', (req, res) => {
  dispatch(createGame());
  res.send();
});

app.get('/api/games', (req, res) => {
  res.send(JSON.stringify(Object.values(store.getState().games)));
});

app.ws('/wsapi/games/:id', (ws, req) => {
  const { id } = req.params;
  const w = watch(store.getState, `games.${id}`);
  store.subscribe(
    w(newVal => {
      try {
        ws.send(JSON.stringify(newVal));
      } catch (e) {}
    })
  );

  ws.onmessage = msg => {
    const payload = JSON.parse(msg.data);
    dispatch(payload);
  };

  const game = store.getState().games[id];

  try {
    ws.send(JSON.stringify(game));
  } catch (e) {}
});
