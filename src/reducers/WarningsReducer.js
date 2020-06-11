import { WARNINGS_FETCH, WARNINGS_FETCH_SUCCESS, WARNINGS_FETCH_FAIL } from '../actions/types';

const INITIAL_STATE = {
  warningsLoading: true,
  warningsObjArr: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case WARNINGS_FETCH:
      return {
        warningsLoading: true,
        warningsObjArr: []
      };

    case WARNINGS_FETCH_SUCCESS:
      return {
        warningsLoading: false,
        warningsObjArr: action.payload.response,
      };

    default:
      return state;
  }
};
