// @flow

import { useEffect, useState } from 'react';
import useInterval from './useInterval';

export default function useTimer(expires: number, interval: number = 1000) {
  const getRemainingTime = () => Math.round(expires - Date.now());

  const [remaining, setRemaining] = useState(getRemainingTime(expires));

  // Run our interval slightly faster
  const delay = Math.floor(remaining / 1000) > 0 ? interval : null;

  // Timer resets when the expiration changes.
  useEffect(() => {
    setRemaining(getRemainingTime());
  }, [expires]);

  useInterval(() => {
    setRemaining(getRemainingTime());
  }, delay);

  return Math.round(remaining / 1000);
}
