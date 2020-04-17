import Config from 'react-native-config';

const timeseriesUrl = `${Config.API_URL}/timeseries?format=json&precision=full&param=time,utctime,name,temperature,feelslike,humidity,precipitation1h,windspeedms,winddirection,weather,sunrise,sunset,smartsymbol&starttime=data&endtime=data&producer=${Config.DATA_PRODUCER}`;

const autocompleteUrl = `${Config.API_URL}/autocomplete?keyword=${Config.AUTOCOMPLETE_KEYWORD}`;

export function getTimeSeries(coords, place) {
  let apiUrl
  if (coords) {
    apiUrl = timeseriesUrl + '&latlon=' + coords.lat + ',' + coords.lon
  }
  if (place) {
    apiUrl = timeseriesUrl + '&place=' + place
  }
  console.log('apiUrl', apiUrl)

  return fetch(apiUrl)
    .then((response) => response.json().then((responseJson) => {
      const tsDataObj = {};
      tsDataObj.serverTime = response.headers.get('Date');
      tsDataObj.placeName = responseJson[0].name;
      tsDataObj.data = responseJson;
      return tsDataObj;
    }))
    .catch((error) => {
      console.error(error);
    });
}

export function getAutocomplete(pattern) {
  const acUrlPattern = autocompleteUrl + '&pattern=' + pattern;
  console.log('acUrlPattern', acUrlPattern)
  return fetch(acUrlPattern)
    .then((response) => response.json().then((responseJson) => {
      return responseJson;
    }))
    .catch((error) => {
      console.error(error);
    });
}
