import { SETTINGS_INIT, SETTINGS_CHANGE } from './types';
import Config from 'react-native-config';
import { UNITS } from '../Constants';
import { asyncStorageGetItem } from '../components/Helper'

const getUnitAbb = function (unitName, unitId) {
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

export const settingsInit = () => (dispatch) => {

  const unitsInUse = []

  if (Config.UNIT_TEMPERATURE) {
    console.log('UNIT_TEMPERATURE set to: ', Config.UNIT_TEMPERATURE)
  }
  if (Config.UNIT_PRECIPITATION) {
    console.log('UNIT_PRECIPITATION set to: ', Config.UNIT_PRECIPITATION)
  }
  if (Config.UNIT_WIND) {
    console.log('UNIT_WIND set to: ', Config.UNIT_WIND)
  }
  if (Config.UNIT_PRESSURE) {
    console.log('UNIT_PRESSURE set to: ', Config.UNIT_PRESSURE)
  }

  UNITS.forEach(element => {
    asyncStorageGetItem(element.unitName).then(res => {
      let unitObj = {}
      if (res) {
        unitObj.unitName = element.unitName
        unitObj.unitId = res
        let unitAbb = getUnitAbb(element.unitName, parseInt(unitObj.unitId))
        unitObj.unitAbb = unitAbb
      } else {
        unitObj.unitName = element.unitName
        unitObj.unitId = getUnitId(element.unitName)
        let unitAbb = getUnitAbb(element.unitName, parseInt(unitObj.unitId))
        unitObj.unitAbb = unitAbb
      }
      unitsInUse.push(unitObj)
    })
  });

  getUnitId = (unitName) => {
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

  dispatch({
    type: SETTINGS_INIT,
    payload: unitsInUse,
  });
}

export const settingsChange = (unitName, unitId) => (dispatch) => {
  const unitObj = {}
  unitObj.unitName = unitName
  unitObj.unitId = unitId
  let unitAbb = getUnitAbb(unitObj.unitName, parseInt(unitObj.unitId))
  unitObj.unitAbb = unitAbb

  dispatch({
    type: SETTINGS_CHANGE,
    payload: unitObj,
  });

}
