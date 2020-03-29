import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { SILHOUETTE } from '../../../config/constants';

export default function AgentProfile({ agent, agentIndex = 0, spymaster }) {
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

const styles = StyleSheet.create({
  agentProfile: {
    width: '48px',
    height: '59px',
    border: '3px solid #ebe1d8',
    marginLeft: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#dbd0c2',
  },
});
