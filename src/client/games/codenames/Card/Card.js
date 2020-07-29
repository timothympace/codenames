// @flow

import React from 'react';
import classnames from 'classnames';
import { useKeyCodeHandler } from '../../../hooks';
import CardFront from './CardFront';
import styles from './Card.scss';

type Props = {
  word: string,
  agent: string,
  role: 'spymaster' | 'operative',
  agentIndex: number,
  revealed: boolean,
  onClick: string => any,
};

export default function Card({ word, agent, role, agentIndex, revealed, onClick }: Props) {
  const isSpymaster = role === 'spymaster';

  const dynamicStyles = {
    transform: revealed ? 'rotateY(180deg)' : 'none',
    cursor: !isSpymaster && !revealed ? 'pointer' : 'auto',
  };

  const handleClick = isSpymaster ? undefined : () => onClick(word);
  const handleKeyDown = useKeyCodeHandler(32, handleClick);

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={word}
      role="button"
      tabIndex={0}
      style={dynamicStyles}
    >
      <div className={styles.face}>
        <CardFront word={word} agent={agent} agentIndex={agentIndex} spymaster={isSpymaster} />
      </div>
      <div
        className={classnames(styles.face, styles.back)}
        style={{ backgroundImage: `url('/images/${agent}-${agentIndex}.jpg')` }}
      />
    </div>
  );
}
