import { AUTOCOMPLETE_INIT, AUTOCOMPLETE_FETCH, AUTOCOMPLETE_FETCH_SUCCESS, AUTOCOMPLETE_FETCH_FAIL } from './types';
import { getAutocomplete } from '../network/Api';

export const autocompleteFetch = (pressedKey, lang) => (dispatch, getState) => {

  dispatch({
    type: AUTOCOMPLETE_FETCH,
    payload: pressedKey,
  });

  const pattern = getState().acDataObj.pattern.join("")

  getAutocomplete(pattern, lang)
    .then((responseJson) => {

      let acDataObj = []

      if (responseJson.autocomplete.result) {
        acDataObj = responseJson.autocomplete.result;
      }

      dispatch({
        type: AUTOCOMPLETE_FETCH_SUCCESS,
        payload: { acDataObj },
      });
    })
    .catch((err) => {
      console.log('autocompleteFetch -> getAutocomplete error:', err);
      dispatch({
        type: AUTOCOMPLETE_FETCH_FAIL,
      });
    });
};

export const autocompleteInit = () => (dispatch) => {
  dispatch({
    type: AUTOCOMPLETE_INIT,
  });
}
