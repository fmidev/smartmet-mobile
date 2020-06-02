import { WARNINGS_FETCH, WARNINGS_FETCH_SUCCESS, WARNINGS_FETCH_FAIL } from './types';
import { getCapFeed } from '../network/Api';
import GeoFencing from 'react-native-geo-fencing';

const parseString = require('react-native-xml2js').parseString;

export const warningsFetch = () => (dispatch, getState) => {

  getCapFeed()
    .then((responseText) => {
      parseString(responseText, function (err, result) {
        if (err) {
          // TODO: Error handling
        } else {
          result.feed.entry.forEach(element => {
            return fetch(element.id[0])
              .then(response => response.text())
              .then((response) => {
                parseString(response, function (err, xmlRes) {
                  if (err) {
                    // TODO: Error handling
                  } else {
                    console.log('xmlRes', xmlRes)
                    const alertData = xmlRes.alert

                    if (alertData.info && Array.isArray(alertData.info)) {

                      const point = {
                        lat: getState().coords.coords.lat,
                        lng: getState().coords.coords.lon
                      }

                      const polygon = alertData.info[0].area[0].polygon[0]

                      console.log('point', point)

                      const polygonArr = polygon.split(' ').map((item) => {
                        let [lat, lng] = item.split(',');
                        lat = parseFloat(lat);
                        lng = parseFloat(lng);
                        return { lat, lng };
                      });

                      console.log('polygonArr', polygonArr);

                      GeoFencing.containsLocation(point, polygonArr)
                        .then(() => {
                          console.log('point is within polygon')
                          console.log('alertData.info[0]', alertData.info[0])

                          const warningObj = {}
                          warningObj.area = alertData.info[0].area[0].areaDesc[0]
                          warningObj.certainty = alertData.info[0].certainty[0]
                          warningObj.description = alertData.info[0].description[0]
                          warningObj.effective = alertData.info[0].effective[0]
                          warningObj.event = alertData.info[0].event[0]
                          warningObj.expires = alertData.info[0].expires[0]
                          warningObj.language = alertData.info[0].language[0]
                          warningObj.onset = alertData.info[0].onset[0]
                          warningObj.senderName = alertData.info[0].senderName[0]
                          warningObj.severity = alertData.info[0].severity[0]

                          console.log('warningObj', warningObj)

                          /*
                          dispatch({
                            type: WARNINGS_FETCH_SUCCESS,
                            payload: { warningsObjArr },
                          });
                          */

                        })
                        .catch(() => console.log('point is NOT within polygon'))
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
}
