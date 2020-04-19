import { LANG_SET, PLACE_SET } from '../actions/types';

const INITIAL_STATE = {
  lang: '',
  coords: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case LANG_SET:
      return { ...state, lang: action.payload };

    case PLACE_SET:
      return { ...state, coords: action.payload };

    default:
      return state;
  }
};
