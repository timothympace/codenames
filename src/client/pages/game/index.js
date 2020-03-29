import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import Board from './Board';
import { useWebSocket } from '../../hooks';
import Timer from '../../components/Timer';
import { pauseTimer, resumeTimer, resetTimer } from '../../../redux/games';

const useGameState = id => {
  const [gameState, setGameState] = useState({});
  useWebSocket(`ws://${window.location.host}/wsapi/games/${id}`, ({ data }) => {
    setGameState(JSON.parse(data));
  });
  return gameState;
};

function Game() {
  const { id } = useParams();

  const sendMessage = useWebSocket(`ws://${window.location.host}/wsapi/games/${id}`, () => {});

  const handleResume = () => {
    sendMessage(
      JSON.stringify(
        resumeTimer({
          id,
        })
      )
    );
  };

  const handlePause = () => {
    sendMessage(
      JSON.stringify(
        pauseTimer({
          id,
        })
      )
    );
  };

  const handleReset = () => {
    sendMessage(
        JSON.stringify(
            resetTimer({
              id,
            })
        )
    );
  };

  const { board, timerExpire, timerPaused } = useGameState(id);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
    >
      <Board gameId={id} board={board} />
      <Timer paused={timerPaused} expires={timerExpire} />
      <button onClick={handleResume}>Resume Timer</button>
      <button onClick={handlePause}>Pause Timer</button>
      <button onClick={handleReset}>Reset Timer</button>
    </div>
  );
}

export default Game;
