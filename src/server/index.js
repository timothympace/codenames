import express from 'express';
import app from './app';
import routes from './routes';

const port = 8086;

app.listen(port, () => {
  console.log(`Server bound to port ${port}`);
});

app.use(express.static('public'));
app.use(routes);
