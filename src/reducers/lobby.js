import update from 'immutability-helper';

export default function(state = {}, action) {
  switch (action.type) {
    case 'RETRIEVE_GAMES':
      return update(state, {
        games: {
          $set: action.payload,
        },
      });

    default:
      return state;
  }
}
