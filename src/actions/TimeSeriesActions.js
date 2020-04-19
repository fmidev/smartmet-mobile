import { TS_FETCH, TS_FETCH_SUCCESS, PLACE_SET } from './types';
import Geolocation from "@react-native-community/geolocation";
import { getTimeSeries } from '../network/Api';

const getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    Geolocation.getCurrentPosition(resolve, reject, { timeout: 500, enableHighAccuracy: true, maximumAge: 0 });
  });
}

export const tsFetch = () => (dispatch, getState) => {
  dispatch({ type: TS_FETCH });
  getPosition()
    .then((position) => {
      const coords = {}
      coords.lat = position.coords.latitude
      coords.lon = position.coords.longitude
      dispatch({
        type: PLACE_SET,
        payload: coords,
      });

      getTimeSeries(coords, getState().lang.lang)
        .then((responseJson) => {
          const tsDataObj = responseJson;
          dispatch({
            type: TS_FETCH_SUCCESS,
            payload: { tsDataObj },
          });
        })
        .catch((err) => {
          console.error(err.message); // TODO: Error handling
        });
    })
    .catch((err) => {
      console.error(err.message); // TODO: Error handling
    });
};

export const tsFetchUpdate = () => (dispatch, getState) => {
  dispatch({ type: TS_FETCH });
  getTimeSeries(getState().coords.coords, getState().lang.lang)
    .then((responseJson) => {
      const tsDataObj = responseJson;
      dispatch({
        type: TS_FETCH_SUCCESS,
        payload: { tsDataObj },
      });
    })
    .catch((err) => {
      console.error(err.message); // TODO: Error handling
    });
}
