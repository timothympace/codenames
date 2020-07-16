import express from 'express';
import expressWs from 'express-ws';
import session from 'cookie-session';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 365 * 86400 * 1000,
    httpOnly: false,
  })
);
expressWs(app);

export default app;
