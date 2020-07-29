import React from 'react';

import { useParams } from 'react-router-dom';
import { useSubscription } from '../../hooks';

function Room() {
  const { id } = useParams();

  const { players = [], gameId } = useSubscription(id);

  return (
    <div>
      {gameId}
      <ol>
        {players.map(m => {
          return <li>{m}</li>;
        })}
      </ol>
    </div>
  );
}

export default Room;
