// @flow

import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { Link } from 'react-router-dom';

type Props = {
  rooms: Array<Object>,
};

function RoomList({ rooms = [] }: Props) {
  return (
    <table className={css(styles.table)}>
      <thead>
        <tr>
          <td>Room ID</td>
          <td>Players</td>
          <td>Actions</td>
        </tr>
      </thead>
      {rooms.map(room => {
        return (
          <tr>
            <td>{room.id}</td>
            <td>{room.players.length}</td>
            <td>
              <Link to={`/room/${room.id}`}>Join</Link>
            </td>
          </tr>
        );
      })}
    </table>
  );
}

const styles = StyleSheet.create({
  table: {
    border: '2px solid black',
    padding: '10px',
    marginBottom: '10px',
  },
});

export default RoomList;
