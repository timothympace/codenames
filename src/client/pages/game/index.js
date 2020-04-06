import React from 'react';

import { useParams } from 'react-router-dom';
import Board from './Board';
import { useGameState, useWebSocket } from '../../hooks';
import { pauseTimer, resumeTimer, resetTimer } from '../../../redux/games';
import HUD from '../../components/HUD';

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
    <div>
      <HUD
        timerExpire={timerExpire}
        timerPaused={timerPaused}
        onPause={handlePause}
        onResume={handleResume}
        onReset={handleReset}
      />
      <Board gameId={id} board={board} />
    </div>
  );
}

export default Game;
