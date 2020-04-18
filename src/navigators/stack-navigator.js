import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { SettingsButton, SearchButton, LocationButton } from '../components/Header';
import BottomTabNavigator from './bottom-tab-navigator';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';
import HeaderTitle from '../components/HeaderTitle';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
  },
});

const Navigator = createStackNavigator(
  {
    Home: {
      screen: BottomTabNavigator,
      headerMode: 'none',
      navigationOptions: ({ navigation }) => ({
        title: <HeaderTitle />,
        headerLeft: () => (
          <SettingsButton
            onPress={() => navigation.navigate('Settings')}
          />
        ),
        headerRight: () => (
          <View style={styles.buttons}>
            <SearchButton
              onPress={() => navigation.navigate('Search')}
            />
            <LocationButton
              onPress={() => navigation.navigate('Home', { 'refreshLocation': true })}
            />
          </View>
        ),
      }),
    },
    Settings: {
      screen: SettingsScreen,
    },
    Search: {
      screen: SearchScreen,
    },
  },
);

const Stack = createAppContainer(Navigator);

export default Stack;
