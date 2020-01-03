import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import Board from './Board';
import useWebSocket from '../../../hooks/useWebSocket';

const useGameState = id => {
  const [gameState, setGameState] = useState({});
  useWebSocket(`ws://localhost:8086/games/${id}`, ({ data }) => {
    setGameState(JSON.parse(data));
  });
  return gameState;
};

function Game() {
  const { id } = useParams();

  const { board } = useGameState(id);

  return (
    <div>
      <Board gameId={id} board={board} />
    </div>
  );
}

export default Game;
