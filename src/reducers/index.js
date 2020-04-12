import { combineReducers } from 'redux';
import TimeSeriesReducer from './TimeSeriesReducer';
import AutocompleteReducer from './AutocompleteReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  tsDataObj: TimeSeriesReducer,
  acDataObj: AutocompleteReducer,
  parameterUnitMap: SettingsReducer,
  parameterUnitAbbMap: SettingsReducer,
});
