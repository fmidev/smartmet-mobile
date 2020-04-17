import React from 'react';
import {
  Text, StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  HomeNavigator,
  WarningsNavigator,
  MapsNavigator,
} from './screen-stack-navigators';
import { translate } from 'react-i18next';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  const IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = 'ios-home';
  } else if (routeName === 'Warnings') {
    iconName = 'ios-warning';
  } else if (routeName === 'Maps') {
    iconName = 'ios-compass';
  }
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const styles = StyleSheet.create({
  navText: {
    fontSize: 12,
    alignSelf: 'center',
    paddingBottom: 1.5,
  },
})

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: ({ screenProps }) => ({
        tabBarLabel: <Text style={styles.navText}> {screenProps.t('navigation:home')}</Text>
      })
    },
    Warnings: {
      screen: WarningsNavigator,
      navigationOptions: ({ screenProps }) => ({
        tabBarLabel: <Text style={styles.navText}> {screenProps.t('navigation:warnings')}</Text>
      })
    },
    Maps: {
      screen: MapsNavigator,
      navigationOptions: ({ screenProps }) => ({
        tabBarLabel: <Text style={styles.navText}> {screenProps.t('navigation:maps')}</Text>
      })
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
      tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
      },
    }),
  },
);

export default translate(['navigation'], { wait: true })(BottomTabNavigator);
