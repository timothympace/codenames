// @flow

import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { SILHOUETTE } from '../../../config/constants';

type Props = {
  agent: string,
  agentIndex: number,
  spymaster: boolean,
};

export default function AgentProfile({ agent, agentIndex = 0, spymaster }: Props) {
  agent = spymaster ? agent : SILHOUETTE;
  agentIndex = spymaster ? agentIndex : 0;

  return (
    <img
      src={`/images/${agent}-profile-${agentIndex}.jpg`}
      alt={agent}
      className={css(styles.agentProfile)}
    />
  );
}

const styles = StyleSheet.create({
  agentProfile: {
    width: '48px',
    height: '59px',
    border: '3px solid #ebe1d8',
    marginLeft: '10px',
    boxSizing: 'border-box',
  },
});
