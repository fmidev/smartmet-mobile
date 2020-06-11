import { WARNINGS_FETCH, WARNINGS_FETCH_SUCCESS, WARNINGS_FETCH_FAIL } from './types';
import { getCapFeed } from '../network/Api';
import GeoFencing from 'react-native-geo-fencing';
import { WARNING_KEYWORD_MAPPER } from '../Constants';

const parseString = require('react-native-xml2js').parseString;

export const warningsFetch = () => (dispatch, getState) => {
  dispatch({ type: WARNINGS_FETCH });
  const point = {
    lat: getState().coords.coords.lat,
    lng: getState().coords.coords.lon
  }
  checkCap(point).then((response) => {
    console.log('RESPONSE', response)
    dispatch({
      type: WARNINGS_FETCH_SUCCESS,
      payload: { response },
    });
  })
}

function checkCap(point) {
  return new Promise((resolve) => {
    getCapFeed()
      .then((responseText) => {
        parseString(responseText, function (err, result) {
          if (err) {
            // TODO: Error handling
          } else {
            let counter = 0
            const warningObjectArray = []
            result.feed.entry.forEach(function (element, index) {
              return fetch(element.id[0])
                .then(response => response.text())
                .then((response) => {
                  parseString(response, function (err, xmlRes) {
                    if (err) {
                      // TODO: Error handling
                    } else {
                      const alertData = xmlRes.alert

                      if (alertData.info && Array.isArray(alertData.info)) {

                        const polygon = alertData.info[0].area[0].polygon[0]
                        const polygonArr = polygon.split(' ').map((item) => {
                          let [lat, lng] = item.split(',');
                          lat = parseFloat(lat);
                          lng = parseFloat(lng);
                          return { lat, lng };
                        });

                        GeoFencing.containsLocation(point, polygonArr)
                          .then(() => {
                            console.log('point is within polygon')
                            counter = counter + 1
                            warningObjectArray.push(getWarningObjectArray(alertData.info[0]))
                            if (counter === result.feed.entry.length) {
                              resolve(warningObjectArray)
                            }
                          })
                          .catch(() => {
                            console.log('point is NOT within polygon')
                            counter = counter + 1
                            if (counter === result.feed.entry.length) {
                              resolve(warningObjectArray)
                            }
                          })
                      }

                    }
                  });
                }).catch((err) => {
                  console.log('fetch', err)
                })
            });
          }
        })

      })
      .catch((err) => {
        // TODO: Error handling
      });
  })
}

function getWarningObjectArray(alertData) {
  const warningObj = {}
  warningObj.area = alertData.area[0].areaDesc[0]
  warningObj.certainty = alertData.certainty[0]
  warningObj.description = alertData.description[0]
  warningObj.effective = alertData.effective[0]
  warningObj.event = alertData.event[0]
  warningObj.expires = alertData.expires[0]
  warningObj.language = alertData.language[0]
  warningObj.onset = alertData.onset[0]
  warningObj.senderName = alertData.senderName[0]
  warningObj.severity = alertData.severity[0]
  warningObj.warningName = 'unidentified'

  WARNING_KEYWORD_MAPPER.forEach(element => {
    element.keywords.forEach(keywordElement => {
      if (warningObj.event.toLowerCase().includes(keywordElement)) {
        warningObj.warningName = keywordElement
      }
    });
  });
  return warningObj
}
