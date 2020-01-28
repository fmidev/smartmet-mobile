import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  HomeNavigator,
  WarningsNavigator,
  WMSNavigator,
  MapsNavigator,
} from './screen-stack-navigators';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  const IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = 'ios-home';
  } else if (routeName === 'Warnings') {
    iconName = 'ios-warning';
  } else if (routeName === 'WMS') {
    iconName = 'logo-youtube';
  } else if (routeName === 'Maps') {
    iconName = 'ios-compass';
  }

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeNavigator,
    Warnings: WarningsNavigator,
    WMS: WMSNavigator,
    Maps: MapsNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

export default BottomTabNavigator;
