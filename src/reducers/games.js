import update from 'immutability-helper';

export default function(state = {}, action) {
  switch (action.type) {
    case 'CREATE_GAME':
      return update(state, {
        [action.payload.id]: {
          $set: action.payload,
        },
      });
    case 'FLIP_CARD':
      return update(state, {
        [action.payload.id]: {
          board: {
            $apply: board => {
              const idx = board.findIndex(({ word }) => word === action.payload.word);
              return update(board, {
                [idx]: {
                  revealed: {
                    $set: true,
                  },
                },
              });
            },
          },
        },
      });
    default:
      return state;
  }
}
