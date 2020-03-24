import { TS_FETCH, TS_FETCH_SUCCESS } from './types';
import Geolocation from "@react-native-community/geolocation";
import { getTimeSeries } from '../network/Api';

const getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    Geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export const tsFetch = () => (dispatch) => {
  dispatch({ type: TS_FETCH });
  getPosition()
    .then((position) => {
      const coords = {}
      coords.lat = position.coords.latitude
      coords.lon = position.coords.longitude
      getTimeSeries(coords)
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
