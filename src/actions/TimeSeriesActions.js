import { TS_FETCH, TS_FETCH_SUCCESS } from './types';
import { getTimeSeries } from '../network/Api';

export const tsFetch = () => (dispatch) => {
  dispatch({ type: TS_FETCH });
  getTimeSeries()
    .then((responseJson) => {
      const tsDataObj = responseJson;
      dispatch({
        type: TS_FETCH_SUCCESS,
        payload: { tsDataObj },
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
