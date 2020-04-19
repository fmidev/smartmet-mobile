import { LANG_SET, PLACE_SET, COORDS_SET } from './types';

export const setLang = (lang) => (dispatch) => {

  dispatch({
    type: LANG_SET,
    payload: lang,
  });

};

export const setPlace = (coords) => (dispatch) => {

  dispatch({
    type: PLACE_SET,
    payload: coords,
  });

};

