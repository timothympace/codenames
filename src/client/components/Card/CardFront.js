import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import AgentProfile from './AgentProfile';

export default function CardFront({ word, spymaster, agent, agentIndex }) {
  return (
    <div className={css(styles.face, styles.cardFront)}>
      <div className={css(styles.cardFrontInner)}>
        <div className={css(styles.cardTop)}>
          <div className={css(styles.flippedWord)}>{word}</div>
          <AgentProfile agent={agent} agentIndex={agentIndex} spymaster={spymaster} />
        </div>
        <div className={css(styles.mainWord)}>{word}</div>
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
  cardFrontInner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    border: '3px solid #a79680',
    borderRadius: '15px',
    boxSizing: 'border-box',
    padding: '8px',
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
  },
  flippedWord: {
    color: '#817c67',
    fontStyle: 'italic',
    borderTop: '3px solid #b1a79b',
    flex: 1,
    transform: 'rotate(180deg)',
    fontSize: '20px',
  },
  gradient: {
    width: '36px',
    height: '187px',
    position: 'absolute',
    top: '-30px',
    left: '99px',
    background: 'linear-gradient(#ffffffbd, transparent 28%, transparent 58%, #ffffffbd 100%)',
    transform: 'rotate(38deg)',
    zIndex: 1,
  },
  cardTop: {
    display: 'flex',
    height: '54%',
  },
});
