import { combineReducers } from 'redux';
import TimeSeriesReducer from './TimeSeriesReducer';
import AutocompleteReducer from './AutocompleteReducer';

export default combineReducers({
  tsDataObj: TimeSeriesReducer,
  acDataObj: AutocompleteReducer,
});
