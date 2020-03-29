// @flow

import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { RED_AGENT, BLUE_AGENT, INNOCENT_BYSTANDER, ASSASSIN } from '../../../config/constants';

type Props = {
  word: string,
  revealed: boolean,
  onClick: string => any,
};

const getAgentColor = (agent, agentIndex, profile = false) => {
  let urlPiece = profile ? '-profile' : '';

  switch (agent) {
    case RED_AGENT:
      return `url('/images/red-agent${urlPiece}-${agentIndex}.jpg');`;
    case BLUE_AGENT:
      return `url('/images/blue-agent${urlPiece}-${agentIndex}.jpg');`;
    case INNOCENT_BYSTANDER:
      return `url('/images/bystander${urlPiece}-${agentIndex}.jpg');`;
    case ASSASSIN:
      return `url('/images/assassin${urlPiece}.jpg');`;
  }
};

export default function Card({ word, agent, agentIndex, revealed, onClick }: Props) {
  const url = new URL(window.location.href);
  const isSpymaster = Boolean(url.searchParams.get('spymaster'));

  const dynamicStyles = StyleSheet.create({
    card: {
      transform: revealed ? 'rotateY(180deg)' : 'none',
      cursor: !isSpymaster && !revealed ? 'pointer' : 'auto',
    },
    silhouette: {
      background: isSpymaster ? getAgentColor(agent, agentIndex, true) : 'url("/images/profile.jpg")',
      backgroundSize: 'contain',
    },
    cardBack: {
      background: getAgentColor(agent, agentIndex),
      backgroundSize: 'contain',
    },
  });

  return (
    <div className={css(styles.card, dynamicStyles.card)} onClick={!isSpymaster && (() => onClick(word))} title={word}>
      <div className={css(styles.face, styles.cardFront, dynamicStyles.cardFront)}>
        <div className={css(styles.cardFrontInner)}>
          <div className={css(styles.cardTop)}>
            <div className={css(styles.flippedWord)}>{word}</div>
            <div className={css(styles.silhouette, dynamicStyles.silhouette)}></div>
          </div>
          <div className={css(styles.mainWord)}>{word}</div>
        </div>
      </div>
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
    borderRadius: '15px',
  },
  cardFront: {
    fontFamily: 'Maven Pro',
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
  silhouette: {
    width: '48px',
    height: '59px',
    border: '3px solid #ebe1d8',
    marginLeft: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#dbd0c2',
  },
  cardTop: {
    display: 'flex',
    height: '54%',
  },
  cardBack: {
    transform: 'rotateY(180deg)',
  },
});
