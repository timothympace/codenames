// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  games: Array<Object>,
};

function GameList({ games = [] }: Props) {
  return (
    <ol>
      {games.map(game => {
        const { id } = game;

        return (
          <li key={id}>
            <span>{id}</span>{' '}
            <span>
              <Link to={`/game/${id}`}>Play as a field operative</Link>
            </span>{' '}
            <span>
              <Link to={`/game/${id}?spymaster=true`}>Play as a spymaster</Link>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default GameList;
