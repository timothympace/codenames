import React from 'react';
import { css, StyleSheet } from 'aphrodite';

export default function HolePunch() {
  return (
    <div className={css(styles.container, styles.outerGradient)}>
      <div className={css(styles.container, styles.outerCircle)}>
        <div className={css(styles.container, styles.innerGradient)}>
          <div className={css(styles.container, styles.innerCircle)} />
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    borderRadius: '100%',
    boxSizing: 'border-box',
  },
  outerGradient: {
    background: 'linear-gradient(135deg, white, #a79680)',
    padding: '1px',
  },
  outerCircle: {
    background: '#e4d7c6',
    padding: '3px',
  },
  innerGradient: {
    background: 'linear-gradient(135deg, #a79680, white)',
    padding: '2px',
  },
  innerCircle: {
    background: 'white',
    padding: 0,
  },
});
