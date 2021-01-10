import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WeatherScreen from '../screens/WeatherScreen';
import WarningsScreen from '../screens/WarningsScreen';
import { translate } from 'react-i18next';
import WeatherLightMode from '../assets/images/icons/weatherLightMode.svg';
import WarningsLightMode from '../assets/images/icons/warningsLightMode.svg';
import MapLightMode from '../assets/images/icons/mapLightMode.svg';
const iconColorActive = 'rgb(58,102,227)';
const iconColor = 'rgb(48,49,147)';
const iconMarginTop = (Platform.OS === 'android') ? 5 : 0;
const tabBarOptions = {
  safeAreaInset: { bottom: 'never', top: 'never' },
  activeTintColor: iconColorActive,
  inactiveTintColor: iconColor,
  labelStyle: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
    flex: 1,
    marginTop: (Platform.OS === 'android') ? 5 : 0,
  },
  style: {
    paddingVertical: 7,
    height: (Platform.OS === 'android') ? 65 : 62
  }
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
      screen: WeatherScreen,
      navigationOptions: ({ }) => ({
        tabBarOptions: tabBarOptions
      })
    },
    Warnings: {
      screen: WarningsScreen,
      navigationOptions: ({ }) => ({
        tabBarOptions: tabBarOptions
      })
    },
    /*
    Maps: {
      screen: MapsNavigator,
      navigationOptions: ({}) => ({
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
