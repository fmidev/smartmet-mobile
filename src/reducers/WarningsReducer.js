import { WARNINGS_FETCH, WARNINGS_FETCH_SUCCESS, WARNINGS_FETCH_FAIL } from '../actions/types';

const INITIAL_STATE = {
  warningsLoading: true,
  warningsBarData: [],
  warningsObj: {},
  warningsError: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case WARNINGS_FETCH:
      return {
        warningsLoading: true,
        warningsObj: {}
      };

    case WARNINGS_FETCH_SUCCESS:
      return {
        warningsLoading: false,
        warningsBarData: action.payload[0],
        warningsObj: action.payload[1],
      };

    case WARNINGS_FETCH_FAIL:
      return {
        warningsLoading: false,
        warningsBarData: action.payload[0],
        warningsObj: {},
        warningsError: true
      };

    default:
      return state;
  }
};
