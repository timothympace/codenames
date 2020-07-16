import useWebSocket from './useWebSocket';

export default function useServerDispatch(roomId) {
  const sendMessage = useWebSocket(`ws://${window.location.host}/wsapi/rooms/${roomId}`);
  const dispatch = action => {
    sendMessage(JSON.stringify(action));
  };
  return dispatch;
}
