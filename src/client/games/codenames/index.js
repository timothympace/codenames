import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import Board from './Board';
import { useSubscription } from '../../hooks';
import HUD from './HUD';

function Game() {
  const [role, setRole] = useState('operative');
  const { id: roomId } = useParams();
  const room = useSubscription(roomId);
  const { gameId } = room;
  const game = useSubscription(gameId);

  const { board, timerExpire, timerPaused } = game;

  const handleNewGame = () => {
    fetch(`/api/rooms/${roomId}/creategame`);
    setRole('operative');
  };

  const handleRoleSwitch = () => {
    setRole(role === 'spymaster' ? 'operative' : 'spymaster');
  };

  return (
    <div>
      <HUD
        gameId={gameId}
        players={room.players}
        timerExpire={timerExpire}
        timerPaused={timerPaused}
        role={role}
        onPause={() => game.pauseTimer()}
        onResume={() => game.startTimer()}
        onReset={() => game.resetTimer({ time: 90 })}
        onNewGame={handleNewGame}
        onSwitchRole={handleRoleSwitch}
      />
      <Board gameId={gameId} board={board} role={role} />
    </div>
  );
}

export default Game;
