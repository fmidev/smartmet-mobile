import Config from 'react-native-config';

const API_URL = `${Config.API_URL}/timeseries?format=json&place=bishkek&producer=gfs_centralasia_surface&precision=normal&param=time,temperature,feelslike,humidity,precipitation1h,windspeedms,winddirection,weather,sunrise,sunset,smartsymbol&starttime=data&endtime=data`;

console.log('API_URL', API_URL);

export function getTimeSeries(coords) {
  return fetch(API_URL)
    .then((response) => response.json().then((responseJson) => {
      const tsDataObj = {};
      tsDataObj.serverTime = response.headers.get('Date');
      tsDataObj.data = responseJson;
      return tsDataObj;
    }))
    .catch((error) => {
      console.error(error);
    });
}
