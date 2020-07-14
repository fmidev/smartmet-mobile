import GeoFencing from 'react-native-geo-fencing';
import moment from 'moment-with-locales-es6';
import underscore from 'underscore';
import _ from 'lodash';
import { WARNINGS_FETCH, WARNINGS_FETCH_SUCCESS, WARNINGS_FETCH_FAIL } from './types';
import { getCapFeed } from '../network/Api';
import { WARNING_KEYWORD_MAPPER, WARNING_SEVERITY_MAPPER } from '../Constants';

const { parseString } = require('react-native-xml2js');

export const warningsFetch = () => (dispatch, getState) => {

  dispatch({ type: WARNINGS_FETCH });

  const point = {
    lat: getState().coords.coords.lat,
    lng: getState().coords.coords.lon,
  };

  const currentTime = moment(getState().tsDataObj.tsDataObj.serverTime);
  const warningsHolder = [];
  const warningTimes = [];

  for (let i = 0; i < 5; i++) {
    const warning = {};
    warning.details = [];
    if (i > 0) {
      warning.time = currentTime.utc().add(1, 'days').format('YYYYMMDD');
    } else {
      warning.time = currentTime.utc().format('YYYYMMDD');
    }
    warningTimes.push(warning.time);
    warningsHolder.push(warning);
  }

  checkCap(point).then((response) => {

    setResponseTimes(response, warningsHolder);
    const payload = [getStyling(warningsHolder), getStylingList(setResponseTimes(response, warningsHolder), warningTimes)];

    dispatch({
      type: WARNINGS_FETCH_SUCCESS,
      payload,
    });

  }).catch((err) => {
    console.log('checkCap: ', err);
    const payload = [getStyling(warningsHolder, true), getStylingList({}, warningTimes)];
    dispatch({
      type: WARNINGS_FETCH_FAIL,
      payload,
    });
  });
};


function checkCap(point) {
  return new Promise((resolve, reject) => {
    getCapFeed()
      .then((responseText) => {
        parseString(responseText, (err, result) => {
          if (err) {
            reject(err);
          } else {
            let counter = 0;
            const warningObject = {};
            result.feed.entry.forEach((element) => fetch(element.id[0])
              .then((response) => response.text())
              .then((response) => {
                parseString(response, (err, xmlRes) => {
                  if (err) {
                    reject(err);
                  } else {
                    const alertData = xmlRes.alert;
                    if (alertData && Array.isArray(alertData.info)) {
                      const polygon = alertData.info[0].area[0].polygon[0];
                      const polygonArr = polygon.split(' ').map((item) => {
                        let [lat, lng] = item.split(',');
                        lat = parseFloat(lat);
                        lng = parseFloat(lng);
                        return { lat, lng };
                      });

                      GeoFencing.containsLocation(point, polygonArr)
                        .then(() => {
                          console.log('point is within polygon');
                          counter += 1;
                          let eventEnglish;

                          alertData.info.forEach((langElement) => {
                            if (langElement.language[0].substring(0, 2) === 'en') {
                              eventEnglish = langElement.event[0];
                            }

                            if (warningObject[langElement.language[0].substring(0, 2)] && warningObject[langElement.language[0].substring(0, 2)].length > 0) {
                              warningObject[langElement.language[0].substring(0, 2)].push(getWarningObj(langElement, eventEnglish));
                            } else {
                              warningObject[langElement.language[0].substring(0, 2)] = [];
                              warningObject[langElement.language[0].substring(0, 2)].push(getWarningObj(langElement, eventEnglish));
                            }
                          });

                          if (counter === result.feed.entry.length) {
                            resolve(warningObject);
                          }
                        })
                        .catch(() => {
                          console.log('point is NOT within polygon');
                          counter += 1;
                          if (counter === result.feed.entry.length) {
                            resolve(warningObject);
                          }
                        });
                    } else {
                      resolve({});
                    }
                  }
                });
              }).catch((err) => {
                console.log('fetch', err);
              }));
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function setResponseTimes(response, warningsHolder) {
  if (_.isPlainObject(response) && !_.isEmpty(response)) {
    for (const key in response) {
      response[key].forEach((resEl) => {
        warningsHolder.forEach((whElement) => {
          switch (resEl.severity) {
            case 'Unknown':
              resEl.severityLevel = 1;
              break;
            case 'Minor':
              resEl.severityLevel = 2;
              break;
            case 'Moderate':
              resEl.severityLevel = 3;
              break;
            case 'Severe':
              resEl.severityLevel = 4;
              break;
            case 'Extreme':
              resEl.severityLevel = 5;
              break;
            default:
              resEl.severityLevel = 1;
          }

          if (moment(whElement.time).isSame(moment(resEl.effective), 'day') && !moment(whElement.time).isSame(moment(resEl.expires), 'day')) {
            const newElement = _.clone(resEl);
            newElement.startTime = parseInt(moment(newElement.effective).format('HH'));
            newElement.endTime = 23;
            whElement.details.push(newElement);
          }

          if (moment(whElement.time).isSame(moment(resEl.effective), 'day') && moment(whElement.time).isSame(moment(resEl.expires), 'day')) {
            const newElement = _.clone(resEl);
            newElement.startTime = parseInt(moment(newElement.effective).format('HH'));
            newElement.endTime = parseInt(moment(newElement.expires).format('HH'));
            whElement.details.push(newElement);
          }

          if (moment(whElement.time).isSame(moment(resEl.expires), 'day') && !moment(whElement.time).isSame(moment(resEl.effective), 'day')) {
            const newElement = _.clone(resEl);
            newElement.startTime = 0;
            newElement.endTime = parseInt(moment(newElement.expires).format('HH'));
            whElement.details.push(newElement);
          }

          if (moment(whElement.time).isBetween(moment(resEl.effective), moment(resEl.expires), 'days')) {
            const newElement = _.clone(resEl);
            newElement.startTime = 0;
            newElement.endTime = 23;
            whElement.details.push(newElement);
          }
        });
      });
    }
  }
  return response;
}


function getWarningObj(alertData, eventEnglish) {
  const warningObj = {};
  warningObj.id = Math.random().toString(16).slice(2);
  warningObj.area = alertData.area[0].areaDesc[0];
  warningObj.certainty = alertData.certainty[0];
  warningObj.description = alertData.description[0];
  warningObj.effective = moment(alertData.effective[0]).utc().format('YYYYMMDDTHHmm');
  warningObj.event = eventEnglish;
  warningObj.expires = moment(alertData.expires[0]).utc().format('YYYYMMDDTHHmm');
  warningObj.language = alertData.language[0];
  warningObj.onset = moment(alertData.onset[0]).utc().format('YYYYMMDDTHHmm');
  warningObj.senderName = alertData.senderName[0];
  warningObj.severity = alertData.severity[0];
  warningObj.warningName = 'unidentified';

  WARNING_KEYWORD_MAPPER.forEach((element) => {
    element.keywords.forEach((keywordElement) => {
      if (warningObj.event.toLowerCase().includes(keywordElement)) {
        warningObj.warningName = keywordElement;
      }
    });
  });
  return warningObj;
}


function getStyling(warningsHolder, error) {
  warningsHolder.forEach((element) => {
    element.styling = {};

    for (let i = 0; i < 24; i++) {
      if (error) {
        element.styling[i] = 'gray';
      } else {
        element.styling[i] = WARNING_SEVERITY_MAPPER[0];
      }

      element.details.forEach((elementDetails) => {
        if ((underscore.invert(WARNING_SEVERITY_MAPPER))[element.styling[i]] < elementDetails.severityLevel && elementDetails.startTime <= i && elementDetails.endTime >= i) {
          element.styling[i] = WARNING_SEVERITY_MAPPER[elementDetails.severityLevel];
        }
      });
    }
  });

  const finalStyles = [];

  warningsHolder.forEach((element) => {
    const warningDay = {};
    warningDay.bars = [];

    for (const key in element.styling) {
      warningDay.bars.push({
        color: element.styling[key],
        width: `${((1 / Object.keys(element.styling).length).toFixed(4)) * 100}%`,
      });
    }

    warningDay.time = element.time;
    finalStyles.push(warningDay);
  });

  return finalStyles;
}


function getStylingList(response, warningTimes, error) {
  if (error) {
    return {};
  }

  for (const key in response) {
    response[key].forEach((element) => {
      element.styling = [];
      warningTimes.forEach((warningTimesElement) => {
        let grayPercentsOne = 100;
        let colorPercents = 0;
        let grayPercentsTwo = 0;

        if (moment(warningTimesElement).isSame(moment(element.effective), 'day') && !moment(warningTimesElement).isSame(moment(element.expires), 'day')) {
          grayPercentsOne = parseInt(moment(element.effective).format('HH')) / 24 * 100;
          colorPercents = 100 - grayPercentsOne;
          grayPercentsTwo = 0;
        }

        if (moment(warningTimesElement).isSame(moment(element.effective), 'day') && moment(warningTimesElement).isSame(moment(element.expires), 'day')) {
          grayPercentsOne = parseInt(moment(element.effective).format('HH')) / 24 * 100;
          grayPercentsTwo = (24 - parseInt(moment(element.expires).format('HH'))) / 24 * 100;
          colorPercents = 100 - (grayPercentsOne + grayPercentsTwo);
        }

        if (moment(warningTimesElement).isSame(moment(element.expires), 'day') && !moment(warningTimesElement).isSame(moment(element.effective), 'day')) {
          grayPercentsOne = 0;
          grayPercentsTwo = (24 - parseInt(moment(element.expires).format('HH'))) / 24 * 100;
          colorPercents = 100 - grayPercentsTwo;
        }

        if (moment(warningTimesElement).isBetween(moment(element.effective), moment(element.expires), 'days')) {
          grayPercentsOne = 0;
          grayPercentsTwo = 0;
          colorPercents = 100;
        }

        element.styling.push({
          time: warningTimesElement,
          bars: [
            {
              color: WARNING_SEVERITY_MAPPER[0],
              width: `${grayPercentsOne}%`,
            },
            {
              color: WARNING_SEVERITY_MAPPER[element.severityLevel],
              width: `${colorPercents}%`,
            },
            {
              color: WARNING_SEVERITY_MAPPER[0],
              width: `${grayPercentsTwo}%`,
            },
          ],
        });
      });
    });
  }

  return response;
}
