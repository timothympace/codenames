import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Timer from './Timer';

export default function HUD({ timerExpire, timerPaused, onResume, onPause, onReset }) {
  return (
    <div className={css(styles.hud)}>
      <Timer paused={timerPaused} expires={timerExpire} />
      <button
        className={css(styles.button, !timerPaused && styles.buttonDisabled)}
        onClick={onResume}
      >
        Resume Timer
      </button>
      <button className={css(styles.button, timerPaused && styles.buttonDisabled)} onClick={onPause}>
        Pause Timer
      </button>
      <button className={css(styles.button)} onClick={onReset}>
        Reset Timer
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
