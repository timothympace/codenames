import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Timer from '../../components/Timer';

export default function HUD({
  gameId,
  players = [],
  timerExpire,
  timerPaused,
  role,
  onResume,
  onPause,
  onReset,
  onNewGame,
  onSwitchRole,
}) {
  return (
    <div className={css(styles.hud)}>
      Players: {players.join(', ')}
      <div>
        Timer: {timerExpire ? <Timer paused={timerPaused} expires={timerExpire} /> : '-:--'}
      </div>
      <button
        className={css(styles.button, (!timerPaused || !gameId) && styles.buttonDisabled)}
        onClick={onResume}
      >
        Resume Timer
      </button>
      <button
        className={css(styles.button, (timerPaused || !gameId) && styles.buttonDisabled)}
        onClick={onPause}
      >
        Pause Timer
      </button>
      <button className={css(styles.button, !gameId && styles.buttonDisabled)} onClick={onReset}>
        Reset Timer
      </button>
      <button className={css(styles.button)} onClick={onNewGame}>
        New Game
      </button>
      <button
        className={css(styles.button, !gameId && styles.buttonDisabled)}
        onClick={onSwitchRole}
      >
        Switch to {role === 'spymaster' ? 'operative' : 'spymaster'}
      </button>
    </div>
  );
}

const styles = StyleSheet.create({
  hud: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '50px',
    background: 'grey',
    marginBottom: '20px',
    fontSize: '28px',
  },
  button: {
    padding: '10px 20px',
    cursor: 'pointer',
  },
  buttonDisabled: {
    cursor: 'auto',
    opacity: '0.2',
  },
});
