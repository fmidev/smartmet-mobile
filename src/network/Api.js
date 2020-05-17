import Config from 'react-native-config';
import moment from 'moment-with-locales-es6';

const timeseriesUrl = `${Config.API_URL}/timeseries?format=json&precision=full&param=time,utctime,name,temperature,feelslike,humidity,precipitation1h,windspeedms,winddirection,weather,sunrise,sunset,smartsymbol&starttime=data&timestep=data&endtime=data&producer=${Config.DATA_PRODUCER}`;

const autocompleteUrl = `${Config.API_URL}/autocomplete?keyword=${Config.AUTOCOMPLETE_KEYWORD}`;

export function getTimeSeries(coords, lang) {
  let apiUrl = timeseriesUrl + '&latlon=' + coords.lat + ',' + coords.lon + '&lang=' + lang
  console.log('apiUrl', apiUrl)

  return fetch(apiUrl)
    .then((response) => response.json().then((responseJson) => {
      const tsDataObj = {};
      // tsDataObj.serverTime = 'Wed, 22 Apr 2020 18:54:41 GMT' // DEBUG
      tsDataObj.serverTime = response.headers.get('Date');
      // console.log('serverTime', tsDataObj.serverTime) // DEBUG
      tsDataObj.nextHourDivisibleByThreeFromServerTime = moment(tsDataObj.serverTime)
      roundUp(tsDataObj.nextHourDivisibleByThreeFromServerTime, 'hour')
      while (parseInt(tsDataObj.nextHourDivisibleByThreeFromServerTime.utc().format('HH')) % 3 !== 0) {
        tsDataObj.nextHourDivisibleByThreeFromServerTime.add(1, 'hour')
      }
      // console.log('Api.js: tsDataObj.nextHourDivisibleByThreeFromServerTime', tsDataObj.nextHourDivisibleByThreeFromServerTime.utc().format('YYYYMMDDTHHmm')) // DEBUG
      tsDataObj.placeName = responseJson[0].name;
      tsDataObj.data = responseJson;
      return tsDataObj;
    }))
}

export function getAutocomplete(pattern, lang) {
  pattern = pattern.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
  const acUrlPattern = autocompleteUrl + '&pattern=' + pattern + '&lang=' + lang;
  console.log('acUrl', acUrlPattern)
  return fetch(acUrlPattern)
    .then((response) => response.json().then((responseJson) => {
      return responseJson;
    }))
    .catch((error) => {
      console.error(error);
    });
}

function roundUp(momentObj, roundBy) {
  return momentObj.add(1, roundBy).startOf(roundBy);
}
