import { SETTINGS_INIT, SETTINGS_CHANGE } from './types';
import Config from 'react-native-config';
import { UNITS } from '../Constants';
import { asyncStorageGetItem } from '../components/Helper'


export const settingsInit = () => (dispatch) => {
  let parameterUnitMap = {}
  let parameterUnitAbbMap = {}
  let parameterUnitPrecisionMap = {}
  UNITS.forEach(element => {
    asyncStorageGetItem(element.parameterName).then(res => {
      if (res) {
        parameterUnitMap[element.parameterName] = getUnitTypeValue(element.parameterName, parseInt(res), 'unit')
        parameterUnitAbbMap[element.parameterName] = getUnitTypeValue(element.parameterName, parseInt(res), 'unitAbb')
        parameterUnitPrecisionMap[element.parameterName] = getUnitTypeValue(element.parameterName, parseInt(res), 'unitPrecision')
      } else {
        let unitId = getUnitId(element.parameterName)
        parameterUnitMap[element.parameterName] = getUnitTypeValue(element.parameterName, parseInt(unitId), 'unit')
        parameterUnitAbbMap[element.parameterName] = getUnitTypeValue(element.parameterName, parseInt(unitId), 'unitAbb')
        parameterUnitPrecisionMap[element.parameterName] = getUnitTypeValue(element.parameterName, parseInt(unitId), 'unitPrecision')
      }

    })
  });

  dispatch({
    type: SETTINGS_INIT,
    payload: [parameterUnitMap, parameterUnitAbbMap, parameterUnitPrecisionMap],
  });
}

export const settingsChange = (parameterName, unitId) => (dispatch) => {
  let parameterUnitMap = {}
  let parameterUnitAbbMap = {}
  let parameterUnitPrecisionMap = {}
  parameterUnitMap[parameterName] = getUnitTypeValue(parameterName, parseInt(unitId), 'unit')
  parameterUnitAbbMap[parameterName] = getUnitTypeValue(parameterName, parseInt(unitId), 'unitAbb')
  parameterUnitPrecisionMap[parameterName] = getUnitTypeValue(parameterName, parseInt(unitId), 'unitPrecision')

  dispatch({
    type: SETTINGS_CHANGE,
    payload: [parameterUnitMap, parameterUnitAbbMap, parameterUnitPrecisionMap],
  });
}

const getUnitTypeValue = (parameterName, unitId, unitTypeKey) => {
  for (var i = 0; i < UNITS.length; i++) {
    if (UNITS[i].parameterName === parameterName) {
      for (var k = 0; k < UNITS[i].unitTypes.length; k++) {
        if (UNITS[i].unitTypes[k].unitId === unitId) {
          return UNITS[i].unitTypes[k][unitTypeKey]
        }
      }
    }
  }
}

const getUnitId = (parameterName) => {
  switch (parameterName) {
    case 'temperature':
      return Config.UNIT_TEMPERATURE
    case 'precipitation':
      return Config.UNIT_PRECIPITATION
    case 'wind':
      return Config.UNIT_WIND
    case 'pressure':
      return Config.UNIT_PRESSURE
    default:
      return false
  }
}
