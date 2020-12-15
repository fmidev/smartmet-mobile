import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
        headerTitleStyle: { alignSelf: 'center' },
        title: <HeaderTitle />,
        headerStyle: {
          height: 44,
          paddingLeft: 200,
        },
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
              onPress={() => { navigation.state.routes[navigation.state.index].params = { refreshLocation: true }; navigation.navigate(navigation.state.routes[navigation.state.index]) }}
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
