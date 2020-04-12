import { AUTOCOMPLETE_INIT, AUTOCOMPLETE_FETCH, AUTOCOMPLETE_FETCH_SUCCESS } from './types';
import { getAutocomplete } from '../network/Api';

export const autocompleteFetch = (pressedKey) => (dispatch, getState) => {

  dispatch({
    type: AUTOCOMPLETE_FETCH,
    payload: pressedKey,
  });

  const pattern = getState().acDataObj.pattern.join("")

  getAutocomplete(pattern)
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
      console.error(err.message); // TODO: Error handling
    });
};

export const autocompleteInit = () => (dispatch) => {
  dispatch({
    type: AUTOCOMPLETE_INIT,
  });
}
