import { AUTOCOMPLETE_INIT, AUTOCOMPLETE_FETCH, AUTOCOMPLETE_FETCH_SUCCESS } from './types';
import { getAutocomplete } from '../network/Api';

export const autocompleteFetch = (pressedKey) => (dispatch, getState) => {

  console.log('autocompleteFetch pressedKey', pressedKey)
  console.log('getState()', getState())

  dispatch({
    type: AUTOCOMPLETE_FETCH,
    payload: pressedKey,
  });

  console.log('pattern', getState().acDataObj.pattern)
  const pattern = getState().acDataObj.pattern.join("")
  console.log('patternString', pattern)

  getAutocomplete(pattern)
    .then((responseJson) => {

      let acDataObj = []

      if (responseJson.autocomplete.result) {
        acDataObj = responseJson.autocomplete.result;
      }

      console.log('acDataObj', acDataObj)
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
