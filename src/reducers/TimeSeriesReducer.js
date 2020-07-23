import { TS_FETCH, TS_FETCH_SUCCESS, TS_FETCH_FAIL } from '../actions/types';

const INITIAL_STATE = {
  tsLoading: true,
  tsDataObj: [],
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TS_FETCH:
      return {
        tsLoading: true,
        tsDataObj: [],
        error: false
      };

    case TS_FETCH_SUCCESS:
      return {
        tsLoading: false,
        error: false,
        tsDataObj: action.payload.tsDataObj,
      };

    case TS_FETCH_FAIL:
      return {
        tsLoading: false,
        error: true,
        tsDataObj: [],
      };

    default:
      return state;
  }
};
