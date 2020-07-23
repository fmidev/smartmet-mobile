import { TS_FETCH, TS_FETCH_SUCCESS, TS_FETCH_FAIL } from '../actions/types';

const INITIAL_STATE = {
  tsLoading: true,
  tsDataObj: [],
  tsError: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TS_FETCH:
      return {
        tsLoading: true,
        tsDataObj: [],
        tsError: false
      };

    case TS_FETCH_SUCCESS:
      return {
        tsLoading: false,
        tsError: false,
        tsDataObj: action.payload.tsDataObj,
      };

    case TS_FETCH_FAIL:
      return {
        tsLoading: false,
        tsError: true,
        tsDataObj: [],
      };

    default:
      return state;
  }
};
