import Config from 'react-native-config';

const API_URL = `${Config.API_URL}/timeseries?format=json&producer=gfs_centralasia_surface&precision=normal&param=time,name,temperature,feelslike,humidity,precipitation1h,windspeedms,winddirection,weather,sunrise,sunset,smartsymbol&starttime=data&endtime=data`;

export function getTimeSeries(coords) {
  const apiUrlCoords = API_URL + '&latlon=' + coords.lat + ',' + coords.lon
  console.log('coords', coords)
  console.log('apiUrlCoords', apiUrlCoords);
  return fetch(apiUrlCoords)
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
