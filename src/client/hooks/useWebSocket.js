// @flow

import { useEffect, useCallback, useRef } from 'react';

// Object used to contain active web sockets, keyed by URI.
const sockets = {};

export default function useWebSocket(uri: string, onMessage: () => any) {
  const subscribeRef = useRef(onMessage);

  // Use the subscribeRef to always point
  // to the latest version of onMessage.
  subscribeRef.current = onMessage;

  const sendMessage = useCallback(
    (...args) => {
      sockets[uri].socket.send(...args);
    },
    [uri]
  );

  // Manage connection state
  useEffect(() => {
    if (!uri) {
      return;
    }

    const connect = () => {
      // Only use one websocket per uri.
      if (uri in sockets) {
        sockets[uri].subscribers.push(subscribeRef);
      } else {
        sockets[uri] = {
          subscribers: [subscribeRef],
          socket: new WebSocket(uri),
        };

        sockets[uri].socket.addEventListener('message', handleMessage);
        sockets[uri].socket.addEventListener('close', reconnect);
      }
    };

    const reconnect = () => {
      sockets[uri].socket = new WebSocket(uri);
      sockets[uri].socket.addEventListener('message', handleMessage);
      sockets[uri].socket.addEventListener('close', reconnect);
    };

    const handleMessage = (...args) => {
      sockets[uri].subscribers.forEach(ref => ref.current?.(...args));
    };

    const cleanup = () => {
      if (uri in sockets) {
        const instance = sockets[uri];
        instance.subscribers = instance.subscribers.filter(ref => ref !== subscribeRef);

        if (instance.subscribers.length === 0) {
          sockets[uri].socket.removeEventListener('close', reconnect);
          sockets[uri].socket.close();
          delete sockets[uri];
        }
      }
    };

    connect();

    return cleanup;
  }, [uri]);

  return sendMessage;
}
