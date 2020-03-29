// @flow

import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Card from '../../components/Card';
import { useWebSocket } from '../../hooks';
import { flipCard } from '../../../redux/games';

type Props = {
  board: Array<string>,
};

export default function Board({ gameId, board }: Props) {
  const sendMessage = useWebSocket(`ws://${window.location.host}/wsapi/games/${gameId}`, () => {});

  const handleClick = word => {
    sendMessage(
      JSON.stringify(
        flipCard({
          id: gameId,
          word,
        })
      )
    );
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
