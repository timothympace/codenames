import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameList from './GameList';
import { createNewGame } from '../../../redux/games';
import { fetchGames } from '../../../redux/lobby';

function Lobby() {
  const games = useSelector(state => state.lobby.games);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handleClick = async () => {
    await dispatch(createNewGame());
    dispatch(fetchGames());
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Create Game
      </button>
      <GameList games={games} />
    </div>
  );
}

export default Lobby;
