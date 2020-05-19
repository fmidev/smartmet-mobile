import { WARNINGS_FETCH, WARNINGS_FETCH_SUCCESS, WARNINGS_FETCH_FAIL } from './types';
import { getCapFeed } from '../network/Api';
const parseString = require('react-native-xml2js').parseString;

export const warningsFetch = () => (dispatch) => {

  getCapFeed()
    .then((responseText) => {
      const warningsObjArr = []
      parseString(responseText, function (err, result) {
        if (err) {
          // TODO: Error handling
        } else {
          result.feed.entry.forEach(element => {
            return fetch(element.id[0])
              .then(response => response.text())
              .then((response) => {
                parseString(response, function (err, result) {
                  if (err) {
                    // TODO: Error handling
                  } else {
                    warningsObjArr.push(result['alert'])
                    dispatch({
                      type: WARNINGS_FETCH_SUCCESS,
                      payload: { warningsObjArr },
                    });

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
