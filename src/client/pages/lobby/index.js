import React, { useEffect, useState } from 'react';
import RoomList from './RoomList';

function Lobby() {
  const [rooms, setRooms] = useState([]);

  const refreshLobby = async () => {
    const response = await fetch('/api/rooms/');
    const data = await response.json();
    setRooms(data);
  };

  useEffect(() => {
    refreshLobby();
  }, []);

  const handleCreateRoom = async () => {
    await fetch('/api/rooms/create');
    refreshLobby();
  };

  return (
    <div>
      {rooms.length > 0 && <RoomList rooms={rooms} />}
      <button type="button" onClick={handleCreateRoom}>
        Create Room
      </button>
      <button type="button" onClick={refreshLobby}>
        Refresh Lobby
      </button>
    </div>
  );
}

export default Lobby;
