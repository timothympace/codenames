// @flow

import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { RED_AGENT, BLUE_AGENT, BYSTANDER, ASSASSIN } from '../../../config/agents';

type Props = {
  word: string,
  revealed: boolean,
  onClick: string => any,
};

const getAgentColor = agent => {
  switch (agent) {
    case RED_AGENT:
      return 'red';
    case BLUE_AGENT:
      return 'blue';
    case BYSTANDER:
      return 'wheat';
    case ASSASSIN:
      return 'black';
  }
};

export default function Card({ word, agent, revealed, onClick }: Props) {
  const url = new URL(window.location.href);
  const isSpymaster = Boolean(url.searchParams.get('spymaster'));

  const dynamicStyles = StyleSheet.create({
    card: {
      transform: revealed ? 'rotateY(180deg)' : 'none',
    },
    cardFront: {
      border: isSpymaster ? `5px solid ${getAgentColor(agent)}` : 'none',
    },
    cardBack: {
      background: getAgentColor(agent),
    },
  });

  return (
    <div className={css(styles.card, dynamicStyles.card)} onClick={() => onClick(word)}>
      <div className={css(styles.face, styles.cardFront, dynamicStyles.cardFront)}>{word}</div>
      <div className={css(styles.face, styles.cardBack, dynamicStyles.cardBack)} />
    </div>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '2.6in',
    height: '1.7in',
    position: 'relative',
    transition: 'transform .5s ease',
    transformStyle: 'preserve-3d',
  },
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '25px',
    background: '#a09f9f',
    zIndex: 10,
  },
  cardBack: {
    transform: 'rotateY(180deg)',
  },
});
