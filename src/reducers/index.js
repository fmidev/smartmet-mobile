import { combineReducers } from 'redux';
import TimeSeriesReducer from './TimeSeriesReducer';
import AutocompleteReducer from './AutocompleteReducer';
import SettingsReducer from './SettingsReducer';
import QueryParamReducer from './QueryParamReducer';
import WarningsReducer from './WarningsReducer';

export default combineReducers({
  tsDataObj: TimeSeriesReducer,
  warningsObjArr: WarningsReducer,
  acDataObj: AutocompleteReducer,
  parameterUnitMap: SettingsReducer,
  parameterUnitAbbMap: SettingsReducer,
  parameterUnitPrecisionMap: SettingsReducer,
  lang: QueryParamReducer,
  coords: QueryParamReducer,
});
