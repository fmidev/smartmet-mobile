import GeoFencing from 'react-native-geo-fencing';
import moment from 'moment-with-locales-es6';
import _ from 'underscore';
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
  checkCap(point).then((response) => {
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

    response.forEach((element) => {
      warningsHolder.forEach((whElement) => {
        switch (element.severity) {
          case 'Unknown':
            element.severityLevel = 1;
            break;
          case 'Minor':
            element.severityLevel = 2;
            break;
          case 'Moderate':
            element.severityLevel = 3;
            break;
          case 'Severe':
            element.severityLevel = 4;
            break;
          case 'Extreme':
            element.severityLevel = 5;
            break;
          default:
            element.severityLevel = 1;
        }


        if (moment(element.effective).format('DD') !== moment(whElement.time).format('DD')) {
          element.startTime = 0;
        } else {
          element.startTime = moment(element.effective).format('HH');
        }

        if (moment(element.expires).format('YYYYMMDD') !== moment(whElement.time).format('YYYYMMDD')) {
          element.endTime = 23;
        } else {
          element.endTime = moment(element.expires).format('HH');
        }

        if (moment(whElement.time).isBetween(moment(element.effective), moment(element.expires)) || moment(whElement.time).format('DD') === moment(element.effective).format('DD') || moment(whElement.time).format('DD') === moment(element.expires).format('DD')) {
          whElement.details.push(element);
        }
      });
    });


    const payload = [getStyling(warningsHolder), getStylingList(response, warningTimes)];

    dispatch({
      type: WARNINGS_FETCH_SUCCESS,
      payload,
    });
  });
};


function checkCap(point) {
  return new Promise((resolve) => {
    getCapFeed()
      .then((responseText) => {
        parseString(responseText, (err, result) => {
          if (err) {
            // TODO: Error handling
          } else {
            let counter = 0;
            const warningObjectArray = [];
            result.feed.entry.forEach((element) => fetch(element.id[0])
              .then((response) => response.text())
              .then((response) => {
                parseString(response, (err, xmlRes) => {
                  if (err) {
                    // TODO: Error handling
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
                          warningObjectArray.push(getWarningObjectArray(alertData.info[0]));
                          if (counter === result.feed.entry.length) {
                            resolve(warningObjectArray);
                          }
                        })
                        .catch(() => {
                          console.log('point is NOT within polygon');
                          counter += 1;
                          if (counter === result.feed.entry.length) {
                            resolve(warningObjectArray);
                          }
                        });
                    } else {
                      resolve([]);
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
        // TODO: Error handling
      });
  });
}


function getWarningObjectArray(alertData) {
  const warningObj = {};
  warningObj.id = Math.random().toString(16).slice(2);
  warningObj.area = alertData.area[0].areaDesc[0];
  warningObj.certainty = alertData.certainty[0];
  warningObj.description = alertData.description[0];
  warningObj.effective = moment(alertData.effective[0]).utc().format('YYYYMMDDTHHmm');
  warningObj.event = alertData.event[0];
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


function getStyling(warningsHolder) {
  warningsHolder.forEach((element) => {
    element.styling = {};

    for (let i = 0; i < 24; i++) {
      element.styling[i] = WARNING_SEVERITY_MAPPER[0];

      element.details.forEach((elementDetails) => {
        if ((_.invert(WARNING_SEVERITY_MAPPER))[element.styling[i]] < elementDetails.severityLevel && elementDetails.startTime <= i && elementDetails.endTime >= i) {
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

function getStylingList(response, warningTimes) {
  response.forEach((element) => {
    element.styling = [];
    warningTimes.forEach((warningTimesElement) => {
      if (moment(warningTimesElement).isBetween(moment(element.effective), moment(element.expires)) || moment(warningTimesElement).format('DD') === moment(element.effective).format('DD') || moment(warningTimesElement).format('DD') === moment(element.expires).format('DD')) {
        element.styling.push({
          time: warningTimesElement,
          bars: [{
            color: WARNING_SEVERITY_MAPPER[element.severityLevel],
            width: '100%',
          }],
        });
      } else {
        element.styling.push({
          time: warningTimesElement,
          bars: [{
            color: WARNING_SEVERITY_MAPPER[0],
            width: '100%',
          }],
        });
      }
    });
  });

  return response;
}
