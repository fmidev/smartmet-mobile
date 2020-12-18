import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  WeatherNavigator,
  WarningsNavigator,
  MapsNavigator,
} from './screen-stack-navigators';
import { translate } from 'react-i18next';

import WeatherLightMode from '../assets/images/icons/weatherLightMode.svg';
import WarningsLightMode from '../assets/images/icons/warningsLightMode.svg';
import MapLightMode from '../assets/images/icons/mapLightMode.svg';
const iconColorActive = 'rgb(58,102,227)';
const iconColor = 'rgb(48,49,147)';
const iconMarginTop = 8;
const tabBarOptions = {
  activeTintColor: iconColorActive,
  inactiveTintColor: iconColor,
  labelStyle: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
    textAlignVertical: 'top',
    flex: 1,
    marginTop: -7,

  },
  style: { height: 82 }
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  if (routeName === 'Weather') {
    return <WeatherLightMode style={{ color: focused ? iconColorActive : iconColor, marginTop: iconMarginTop }} />;
  } else if (routeName === 'Warnings') {
    return <WarningsLightMode style={{ color: focused ? iconColorActive : iconColor, marginTop: iconMarginTop }} />;
  } else if (routeName === 'Maps') {
    return <MapLightMode style={{ color: focused ? iconColorActive : iconColor, marginTop: iconMarginTop }} />;
  }
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    Weather: {
      screen: WeatherNavigator,
      navigationOptions: ({ screenProps }) => ({
        tabBarOptions: tabBarOptions
      })
    },
    Warnings: {
      screen: WarningsNavigator,
      navigationOptions: ({ screenProps }) => ({
        tabBarOptions: tabBarOptions
      })
    },
    /*
    Maps: {
      screen: MapsNavigator,
      navigationOptions: ({ screenProps }) => ({
        tabBarOptions: tabBarOptions
      })
    }
    */
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
    }),
  },
);

export default translate(['navigation'], { wait: true })(BottomTabNavigator);
