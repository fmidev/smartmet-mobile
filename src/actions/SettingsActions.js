import { SETTINGS_INIT, SETTINGS_CHANGE } from './types';
import Config from 'react-native-config';
import { UNITS } from '../Constants';
import { asyncStorageGetItem } from '../components/Helper'


export const settingsInit = () => (dispatch) => {
  let parameterUnitMap = {}
  let parameterUnitAbbMap = {}
  UNITS.forEach(element => {
    asyncStorageGetItem(element.unitName).then(res => {
      if (res) {
        let unit = getUnit(element.unitName, parseInt(res))
        let unitAbb = getUnitAbb(element.unitName, parseInt(res))
        parameterUnitMap[element.unitName] = unit
        parameterUnitAbbMap[element.unitName] = unitAbb
      } else {
        let unitId = getUnitId(element.unitName)
        let unit = getUnit(element.unitName, parseInt(unitId))
        let unitAbb = getUnitAbb(element.unitName, parseInt(unitId))
        parameterUnitMap[element.unitName] = unit
        parameterUnitAbbMap[element.unitName] = unitAbb
      }

    })
  });

  dispatch({
    type: SETTINGS_INIT,
    payload: [parameterUnitMap, parameterUnitAbbMap],
  });
}

export const settingsChange = (unitName, unitId) => (dispatch) => {
  let parameterUnitMap = {}
  let parameterUnitAbbMap = {}
  let unit = getUnit(unitName, parseInt(unitId))
  let unitAbb = getUnitAbb(unitName, parseInt(unitId))
  parameterUnitMap[unitName] = unit
  parameterUnitAbbMap[unitName] = unitAbb

  dispatch({
    type: SETTINGS_CHANGE,
    payload: [parameterUnitMap, parameterUnitAbbMap],
  });
}

const getUnitAbb = (unitName, unitId) => {
  for (var i = 0; i < UNITS.length; i++) {
    if (UNITS[i].unitName === unitName) {
      for (var k = 0; k < UNITS[i].unitTypes.length; k++) {
        if (UNITS[i].unitTypes[k].unitId === unitId) {
          return UNITS[i].unitTypes[k].unitAbb
        }
      }
    }
  }
}

const getUnit = (unitName, unitId) => {
  for (var i = 0; i < UNITS.length; i++) {
    if (UNITS[i].unitName === unitName) {
      for (var k = 0; k < UNITS[i].unitTypes.length; k++) {
        if (UNITS[i].unitTypes[k].unitId === unitId) {
          return UNITS[i].unitTypes[k].unit
        }
      }
    }
  }
}

const getUnitId = (unitName) => {
  switch (unitName) {
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
