// @flow

import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import AgentProfile from './AgentProfile';
import GradientOverlay from './GradientOverlay';

type Props = {
  word: string,
  spymaster: boolean,
  agent: string,
  agentIndex: number,
};

export default function CardFront({ word, spymaster, agent, agentIndex }: Props) {
  return (
    <div className={css(styles.face, styles.cardFront)}>
      <div className={css(styles.wrapper)}>
        <div className={css(styles.cardFrontInner)}>
          <div className={css(styles.cardTop)}>
            <div className={css(styles.flippedWord)}>{word}</div>
            <AgentProfile agent={agent} agentIndex={agentIndex} spymaster={spymaster} />
          </div>
          <div className={css(styles.mainWord)}>{word}</div>
        </div>
        <GradientOverlay />
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '15px',
  },
  cardFront: {
    textTransform: 'uppercase',
    backgroundColor: '#e4d7c6',
    zIndex: 10,
    padding: '15px',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  wrapper: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
  },
  cardFrontInner: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    border: '3px solid #a79680',
    borderRadius: '15px',
    boxSizing: 'border-box',
    padding: '8px',
    overflow: 'hidden',
  },
  mainWord: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    backgroundColor: 'white',
    height: '39%',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    zIndex: 1,
  },
  flippedWord: {
    color: '#817c67',
    fontStyle: 'italic',
    borderTop: '3px solid #b1a79b',
    flex: 1,
    transform: 'rotate(180deg)',
    fontSize: '20px',
  },

  cardTop: {
    display: 'flex',
    height: '54%',
  },
});
