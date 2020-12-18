import { createStackNavigator } from 'react-navigation-stack';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';
import WeatherScreen from '../screens/WeatherScreen';
import WarningsScreen from '../screens/WarningsScreen';
import MapsScreen from '../screens/MapsScreen';

export const SettingsNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: { header: () => false },
  },
);

export const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    defaultNavigationOptions: { header: () => false },
  },
);


export const WeatherNavigator = createStackNavigator(
  {
    Weather: WeatherScreen,
  },
  {
    defaultNavigationOptions: { header: () => false },
  },
);

export const WarningsNavigator = createStackNavigator(
  {
    Warnings: WarningsScreen,
  },
  {
    defaultNavigationOptions: { header: () => false },
  },
);

export const MapsNavigator = createStackNavigator(
  {
    Maps: MapsScreen,
  },
  {
    defaultNavigationOptions: { header: () => false },
  },
);
