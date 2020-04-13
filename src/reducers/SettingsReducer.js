import { SETTINGS_INIT, SETTINGS_CHANGE } from '../actions/types';

const INITIAL_STATE = {
  parameterUnitMap: {},
  parameterUnitAbbMap: {},
  parameterUnitPrecisionMap: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SETTINGS_INIT:
      return {
        parameterUnitMap: action.payload[0],
        parameterUnitAbbMap: action.payload[1],
        parameterUnitPrecisionMap: action.payload[2],
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
      let newparameterUnitPrecisionMap = {
        ...state.parameterUnitPrecisionMap,
        ...action.payload[2]
      }
      return {
        parameterUnitMap: newparameterUnitMap,
        parameterUnitAbbMap: newparameterUnitAbbMap,
        parameterUnitPrecisionMap: newparameterUnitPrecisionMap,
      }

    default:
      return state;
  }
};
