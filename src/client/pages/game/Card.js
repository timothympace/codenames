// @flow

import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import {
  RED_AGENT,
  BLUE_AGENT,
  INNOCENT_BYSTANDER,
  ASSASSIN,
  SILHOUETTE,
} from '../../../config/constants';
import mavenPro from '../../fonts/mavenPro';
import { useKeyCodeHandler } from '../../hooks';

type Props = {
  word: string,
  revealed: boolean,
  onClick: string => any,
};

const getAgentBackground = (agent, agentIndex) => {
  switch (agent) {
    case RED_AGENT:
      return `url('/images/red-agent-${agentIndex}.jpg');`;
    case BLUE_AGENT:
      return `url('/images/blue-agent-${agentIndex}.jpg');`;
    case INNOCENT_BYSTANDER:
      return `url('/images/bystander-${agentIndex}.jpg');`;
    case ASSASSIN:
      return `url('/images/assassin-${agentIndex}.jpg');`;
  }
};

function AgentProfile({ agent, agentIndex = 0, spymaster }) {
  agent = spymaster ? agent : SILHOUETTE;
  agentIndex = spymaster ? agentIndex : 0;

  const dynamicStyles = StyleSheet.create({
    agentProfile: {
      background: `url("/images/${agent}-profile-${agentIndex}.jpg")`,
      backgroundSize: 'contain',
    },
  });

  return <div className={css(styles.agentProfile, dynamicStyles.agentProfile)} />;
}

function CardFront({ word, spymaster, agent, agentIndex }) {
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

export default function Card({ word, agent, agentIndex, revealed, onClick }: Props) {
  const url = new URL(window.location.href);
  const isSpymaster = Boolean(url.searchParams.get('spymaster'));

  const dynamicStyles = StyleSheet.create({
    card: {
      transform: revealed ? 'rotateY(180deg)' : 'none',
      cursor: !isSpymaster && !revealed ? 'pointer' : 'auto',
    },
    cardBack: {
      background: `url('/images/${agent}-${agentIndex}.jpg');`,
      backgroundSize: 'contain',
    },
  });

  const handleClick = isSpymaster ? undefined : () => onClick(word);
  const handleKeyDown = useKeyCodeHandler(32, handleClick);

  return (
    <div
      className={css(styles.card, dynamicStyles.card)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={word}
      role="button"
      tabIndex={0}
    >
      <CardFront word={word} agent={agent} agentIndex={agentIndex} spymaster={isSpymaster} />
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
    fontFamily: [mavenPro],
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
  agentProfile: {
    width: '48px',
    height: '59px',
    border: '3px solid #ebe1d8',
    marginLeft: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#dbd0c2',
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
  cardBack: {
    transform: 'rotateY(180deg)',
  },
});
