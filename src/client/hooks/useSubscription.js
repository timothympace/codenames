import { useState } from 'react';
import useWebSocket from './useWebSocket';

export default function useSubscription(id) {
  const [state, setState] = useState();
  const uri = id ? `ws://${window.location.host}/wsapi/subscribe/${id}` : null;

  const sendMessage = useWebSocket(uri, ({ data }) => {
    setState(JSON.parse(data));
  });

  if (!state) {
    return {};
  }

  return new Proxy(state, {
    get(target, key) {
      if (key in target) {
        return target[key];
      }

      return args => {
        sendMessage(
          JSON.stringify({
            method: key,
            ...args,
          })
        );
      };
    },
  });
}
