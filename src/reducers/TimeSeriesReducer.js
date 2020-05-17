import { TS_FETCH, TS_FETCH_SUCCESS, TS_FETCH_FAIL } from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  tsDataObj: [],
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TS_FETCH:
      return INITIAL_STATE;

    case TS_FETCH_SUCCESS:
      return {
        loading: false,
        tsDataObj: action.payload.tsDataObj,
      };

    case TS_FETCH_FAIL:
      return {
        loading: false,
        error: true,
        tsDataObj: [],
      };

    default:
      return state;
  }
};
