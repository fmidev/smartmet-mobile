import { SETTINGS_INIT, SETTINGS_CHANGE } from '../actions/types';

const INITIAL_STATE = {
  parameterUnitMap: {},
  parameterUnitAbbMap: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SETTINGS_INIT:
      return {
        parameterUnitMap: action.payload[0],
        parameterUnitAbbMap: action.payload[1],
      }

    case SETTINGS_CHANGE:
      let newparameterUnitMap = {
        ...state.parameterUnitMap,
        ...action.payload[0]
      }
      let newparameterUnitAbbMap = {
        ...state.parameterUnitAbbMap,
        ...action.payload[1]
      }
      return {
        parameterUnitMap: newparameterUnitMap,
        parameterUnitAbbMap: newparameterUnitAbbMap
      }

    default:
      return state;
  }
};
