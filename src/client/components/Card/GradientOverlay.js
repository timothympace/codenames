import React from 'react';
import { css, StyleSheet } from 'aphrodite';

export default function GradientOverlay() {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.gradient, styles.narrow, styles.gradient1)} />
      <div className={css(styles.gradient, styles.wide, styles.gradient2)} />
      <div className={css(styles.gradient, styles.wide, styles.gradient3)} />
      <div className={css(styles.gradient, styles.narrow, styles.gradient4)} />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  gradient: {
    transform: 'rotate(38deg)',
    zIndex: 0,
    position: 'absolute',
  },
  narrow: {
    width: '15px',
  },
  wide: {
    width: '34px',
  },
  gradient1: {
    left: '10px',
    top: '-14px',
    height: '81px',
    background: 'linear-gradient(-38deg, transparent, #ffffff1c 50%, #ffffffc9)',
  },
  gradient2: {
    height: '157px',
    top: '-27px',
    left: '19px',
    background:
      'linear-gradient(-38deg, rgba(255, 255, 255, 0.55), transparent 50%, transparent 60%, #ffffffc9)',
  },
  gradient3: {
    height: '196px',
    top: '-32px',
    left: '94px',
    background:
      'linear-gradient(-38deg, rgba(255, 255, 255, 0.55), transparent 20%, transparent 70%, rgba(255, 255, 255, 0.79))',
  },
  gradient4: {
    height: '179px',
    top: '-23px',
    left: '140px',
    background:
      'linear-gradient(-38deg, rgba(255, 255, 255, 0.55), transparent 20%, transparent 70%, rgba(255, 255, 255, 0.79))',
  },
});
