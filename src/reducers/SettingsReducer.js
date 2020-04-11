import { SETTINGS_INIT, SETTINGS_CHANGE } from '../actions/types';

const INITIAL_STATE = {
  unitsInUse: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETTINGS_INIT:
      return {
        unitsInUse: action.payload,
      }

    case SETTINGS_CHANGE:
      return {
        ...state,
        unitsInUse: state.unitsInUse.map(data => {
          if (data.unitName === action.payload.unitName) {
            return action.payload;
          } else {
            return { unitName: data.unitName, unitId: data.unitId, unitAbb: data.unitAbb };
          }
        }
        )
      }
    default:
      return state;
  }
};
