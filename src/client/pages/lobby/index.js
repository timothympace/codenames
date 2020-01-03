import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameList from './GameList';
import createGame, { retrieveGames } from '../../actions/createGame';

function Lobby() {
  const games = useSelector(state => state.lobby.games);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveGames());
  }, [dispatch]);

  return (
    <div>
      <button type="button" onClick={() => dispatch(createGame())}>
        Create Game
      </button>
      <GameList games={games} />
    </div>
  );
}

export default Lobby;
