import { TS_FETCH, TS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  tsDataObj: [],
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

    default:
      return state;
  }
};
