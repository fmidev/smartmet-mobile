import { AUTOCOMPLETE_INIT, AUTOCOMPLETE_FETCH, AUTOCOMPLETE_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  pattern: [],
  acDataObj: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTOCOMPLETE_INIT:
      return {
        loading: false,
        pattern: [],
        acDataObj: [],
      }
    case AUTOCOMPLETE_FETCH:
      if (action.payload === 'Backspace') {

        return {
          pattern: [...state.pattern.slice(0, -1)],
          loading: true,
        }

      } else {
        return {
          pattern: [...state.pattern, action.payload],
          loading: true,
        }
      }

    case AUTOCOMPLETE_FETCH_SUCCESS:
      return {
        loading: false,
        acDataObj: action.payload.acDataObj,
        pattern: [...state.pattern]
      };

    default:
      return state;
  }
};
