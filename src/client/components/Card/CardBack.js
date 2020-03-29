// @flow

import React from 'react';
import { css, StyleSheet } from 'aphrodite';

type Props = {
  agent: string,
  agentIndex: number,
};

export default function CardFront({ agent, agentIndex }: Props) {
  const dynamicStyles = StyleSheet.create({
    cardBack: {
      background: `url('/images/${agent}-${agentIndex}.jpg');`,
      backgroundSize: 'contain',
    },
  });

  return <div className={css(styles.face, styles.cardBack, dynamicStyles.cardBack)} />;
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
  cardBack: {
    transform: 'rotateY(180deg)',
  },
});
