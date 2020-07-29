// @flow

import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Card from './Card';
import { useSubscription } from '../../hooks';

type Props = {
  gameId: string,
  board: Array<string>,
  role: 'spymaster' | 'operative',
};

export default function Board({ gameId, board, role }: Props) {
  const gameInstance = useSubscription(gameId);

  const handleClick = word => {
    gameInstance.revealCard({ word });
  };

  if (!board) {
    return null;
  }

  return (
    <div className={css(styles.board)}>
      {board.map(({ word, agent, agentIndex, revealed }) => {
        return (
          <Card
            key={word}
            word={word}
            role={role}
            agent={agent}
            agentIndex={agentIndex}
            revealed={revealed}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
}

const styles = StyleSheet.create({
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, min-content)',
    gridTemplateRows: 'repeat(5, min-content)',
    gridGap: '20px',
    justifyContent: 'center',
  },
});
