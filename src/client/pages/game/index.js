import React from 'react';

import { useParams } from 'react-router-dom';
import Board from './Board';
import { useRoomState, useServerDispatch } from '../../hooks';
import HUD from '../../components/HUD';
import { pauseGameTimer, resetGameTimer, startGameTimer } from '../../../server/actions/games';

function Game() {
  const { id } = useParams();

  const serverDispatch = useServerDispatch(id);

  const handleResume = () => serverDispatch(startGameTimer({ id }));
  const handlePause = () => serverDispatch(pauseGameTimer({ id }));
  const handleReset = () => serverDispatch(resetGameTimer({ id, time: 90 }));

  const { game } = useRoomState(id);
  const { board, timerExpire, timerPaused } = game;

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
