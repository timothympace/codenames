import { useState } from 'react';
import useWebSocket from './useWebSocket';

export default function useGameState(id) {
  const [gameState, setGameState] = useState({});
  useWebSocket(`ws://${window.location.host}/wsapi/games/${id}`, ({ data }) => {
    setGameState(JSON.parse(data));
  });
  return gameState;
}
