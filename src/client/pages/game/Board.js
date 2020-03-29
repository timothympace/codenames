// @flow

import React, { useState } from 'react';
import { css, StyleSheet } from 'aphrodite';
import Card from './Card';
import useWebSocket from '../../hooks/useWebSocket';
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
          <Card key={word} word={word} agent={agent} agentIndex={agentIndex} revealed={revealed} onClick={handleClick} />
        );
      })}
    </div>
  );
}

const styles = StyleSheet.create({
  board: {
    display: 'grid',
    gridTemplateColumns: '2.6in 2.6in 2.6in 2.6in 2.6in',
    gridTemplateRows: '1.7in 1.7in 1.7in 1.7in 1.7in',
    gridGap: '20px',
  },
});
