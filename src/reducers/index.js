import { combineReducers } from 'redux';
import TimeSeriesReducer from './TimeSeriesReducer';

export default combineReducers({
  tsDataObj: TimeSeriesReducer,
});
