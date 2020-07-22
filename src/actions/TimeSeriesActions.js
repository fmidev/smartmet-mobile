import { TS_FETCH, TS_FETCH_SUCCESS, TS_FETCH_FAIL, PLACE_SET } from './types';
import Geolocation from "@react-native-community/geolocation";
import { getTimeSeries } from '../network/Api';

const getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    Geolocation.getCurrentPosition(resolve, reject, { maximumAge: 0, timeout: 20000, enableHighAccuracy: false });
  });
}

export const tsFetch = () => (dispatch, getState) => {
  dispatch({ type: TS_FETCH });

  return getPosition()
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
          if (responseJson.data.length < 1) {
            dispatch({
              type: TS_FETCH_FAIL,
            });
          } else {
            const tsDataObj = responseJson;
            dispatch({
              type: TS_FETCH_SUCCESS,
              payload: { tsDataObj },
            });
          }
        })
        .catch((err) => {
          console.log('tsFetch -> getTimeSeries error:', err);
          dispatch({
            type: TS_FETCH_FAIL,
          });
        });
    })
    .catch((err) => {
      console.log('tsFetch -> getPosition error: ', err);
      dispatch({
        type: TS_FETCH_FAIL,
      });
    });
};

export const tsFetchUpdate = () => (dispatch, getState) => {
  dispatch({ type: TS_FETCH });

  return getTimeSeries(getState().coords.coords, getState().lang.lang)
    .then((responseJson) => {
      const tsDataObj = responseJson;
      dispatch({
        type: TS_FETCH_SUCCESS,
        payload: { tsDataObj },
      });
    })
    .catch((err) => {
      console.log('tsFetchUpdate -> getTimeSeries error:', err);
      dispatch({
        type: TS_FETCH_FAIL,
      });
    });
}
