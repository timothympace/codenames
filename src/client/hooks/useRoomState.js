import { useState } from 'react';
import useWebSocket from './useWebSocket';

export default function useRoomState(id) {
  const [roomState, setRoomState] = useState({});
  useWebSocket(`ws://${window.location.host}/wsapi/rooms/${id}`, ({ data }) => {
    setRoomState(JSON.parse(data));
  });
  return roomState;
}
