import { createStackNavigator } from 'react-navigation-stack';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import WarningsScreen from '../screens/WarningsScreen';
import WMSScreen from '../screens/WMSScreen';
import MapsScreen from '../screens/MapsScreen';

export const SettingsNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: { headerTitleAlign: 'center' },
  },
);

export const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
);

export const WarningsNavigator = createStackNavigator(
  {
    Warnings: WarningsScreen,
  },
  {
    defaultNavigationOptions: { headerTitleAlign: 'center' },
  },
);

export const WMSNavigator = createStackNavigator(
  {
    WMS: WMSScreen,
  },
  {
    defaultNavigationOptions: { headerTitleAlign: 'center' },
  },
);

export const MapsNavigator = createStackNavigator(
  {
    Maps: MapsScreen,
  },
  {
    defaultNavigationOptions: { headerTitleAlign: 'center' },
  },
);
