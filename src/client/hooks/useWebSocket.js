// @flow

import { useEffect, useCallback, useRef } from 'react';

const sockets = {};

export default function useWebSocket(uri: string, onMessage: () => any) {
  const wsRef = useRef();
  const onMesssageRef = useRef(onMessage);
  onMesssageRef.current = onMessage;

  const send = useCallback((...args) => {
    wsRef.current.send(...args);
  }, []);

  // Manage connection state
  useEffect(() => {
    const connect = () => {
      // Only use one websocket per uri.
      if (uri in sockets) {
        const instance = sockets[uri];
        instance.count += 1;
        wsRef.current = instance.socket;
      } else {
        wsRef.current = new WebSocket(uri);
        sockets[uri] = {
          count: 1,
          socket: wsRef.current,
        };
      }

      wsRef.current.addEventListener('open', () => {
        // flush send buffer
      });

      // TODO, figure out reconnects.
      //wsRef.current.addEventListener('close', connect);

      wsRef.current.addEventListener('message', (...args) => {
        onMesssageRef.current(...args);
      });
    };

    connect();

    return () => {
      if (uri in sockets) {
        const instance = sockets[uri];
        instance.count -= 1;

        if (instance.count === 0) {
          wsRef.current.removeEventListener('close', connect);
          delete sockets[uri];
          wsRef.current.close();
        }
      }
    };
  }, [uri]);

  return send;
}
