// @flow

import { useEffect, useState } from 'react';
import useInterval from './useInterval';

export default function useTimer(expires: number, interval: number = 1000) {
  const getRemainingTime = () => Math.round((expires - Date.now()) / 1000);

  const [remaining, setRemaining] = useState(getRemainingTime(expires));

  // Run our interval slightly faster
  const delay = remaining > 0 ? interval : null;

  // Timer resets when the expiration changes.
  useEffect(() => {
    setRemaining(getRemainingTime());
  }, [expires]);

  useInterval(() => {
    setRemaining(getRemainingTime());
  }, delay);

  return remaining;
}
