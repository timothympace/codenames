import { useEffect, useRef } from 'react';

/**
 * Calls a function (callback) at the specified interval (delay).
 * @param callback
 * @param delay
 */
export default function useInterval(callback, delay) {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id;
    if (delay !== null) {
      id = setInterval(() => {
        savedCallback.current();
      }, delay);
    }

    return () => clearInterval(id);
  }, [delay]);
}
