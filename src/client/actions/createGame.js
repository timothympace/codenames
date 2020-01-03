// @flow

export default function createGame() {
  return async dispatch => {
    const response = await fetch('/api/games/create');
    const payload = await response.text();

    dispatch({
      type: 'CREAT_GAME',
      payload,
    });
  };
}

export function retrieveGames() {
  return async dispatch => {
    const response = await fetch('/api/games');
    const payload = await response.json();

    dispatch({
      type: 'RETRIEVE_GAMES',
      payload,
    });
  };
}
