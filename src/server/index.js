import express from 'express';
import expressWs from 'express-ws';
import { createStore } from 'redux/es/redux.mjs';
import watch from 'redux-watch';
import createGame from '../actions/createGame.js';
import reducers from '../reducers/index.js';

const store = createStore(reducers);
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

app.ws('/games/:id', (ws, req) => {
  const { id } = req.params;
  const w = watch(store.getState, `games.${id}`);
  store.subscribe(
    w(newVal => {
      try {
        ws.send(JSON.stringify(newVal));
      } catch(e) {}
    })
  );

  ws.onmessage = msg => {
    const payload = JSON.parse(msg.data);
    dispatch(payload);
  };

  const game = store.getState().games[id];
  try {
    ws.send(JSON.stringify(game));
  } catch(e) {}
});
