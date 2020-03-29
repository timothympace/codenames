// @flow

import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import mavenPro from '../../fonts/mavenPro';
import { useKeyCodeHandler } from '../../hooks';
import CardFront from './CardFront';
import CardBack from './CardBack';

type Props = {
  word: string,
  agent: string,
  agentIndex: number,
  revealed: boolean,
  onClick: string => any,
};

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
      <CardBack agent={agent} agentIndex={agentIndex} />
    </div>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '2.6in',
    height: '1.7in',
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
  cardBack: {
    transform: 'rotateY(180deg)',
  },
});
