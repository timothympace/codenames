import React from 'react';

import { useParams } from 'react-router-dom';
import { useRoomState } from '../../hooks';

function Room() {
  const { id } = useParams();

  const { players = [] } = useRoomState(id);

  return (
    <ol>
      {players.map(m => {
        return <li>{m}</li>;
      })}
    </ol>
  );
}

export default Room;
