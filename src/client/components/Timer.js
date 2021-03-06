// @flow

import React from 'react';
import { useTimer } from '../hooks';

type Props = {
  expires: number,
  paused: number,
};

function Timer({ expires, paused }: Props) {
  const interval = paused ? null : undefined;
  const secondsRemaining = useTimer(paused ? Date.now() + (expires - paused) : expires, interval);

  const seconds = secondsRemaining % 60;
  const minutes = Math.floor(secondsRemaining / 60);

  const clock = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return <span role="timer">{clock}</span>;
}

export default Timer;
