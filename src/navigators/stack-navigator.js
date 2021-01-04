import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { SettingsButton, SearchButton, LocationButton } from '../components/Header';
import BottomTabNavigator from './bottom-tab-navigator';
import SettingsScreen from '../screens/SettingsScreen';
import SymbolsScreen from '../screens/SymbolsScreen';
import SearchScreen from '../screens/SearchScreen';
import WarningsScreen from '../screens/WarningsScreen';
import HeaderTitle from '../components/HeaderTitle';
import SideMenu from '../components/SideMenu';

const mainNavigator = createStackNavigator(
  {
    Home: {
      screen: BottomTabNavigator,
      headerMode: 'none',
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: { alignSelf: 'center' },
        title: <HeaderTitle />,
        headerStyle: {
          height: 44,
        },
        headerLeft: () => (
          <SettingsButton
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <SearchButton
              onPress={() => navigation.navigate('Search')}
            />
            <LocationButton
              onPress={() => { navigation.state.routes[navigation.state.index].params = { refreshLocation: true }; navigation.navigate(navigation.state.routes[navigation.state.index]); }}
            />
          </View>
        ),
      }),
    },
    Warnings: {
      screen: WarningsScreen,
    },
    Search: {
      screen: SearchScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const settingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
    },
  },
);

const symbolsStack = createStackNavigator(
  {
    Symbols: {
      screen: SymbolsScreen,
    },
  },
);

const Drawer = createDrawerNavigator(
  {
    Home: { screen: mainNavigator },
    Settings: { screen: settingsStack },
    Symbols: { screen: symbolsStack },
  },
  {
    contentComponent: (props) => <SideMenu {...props} />,
  },
);

const App = createAppContainer(Drawer);

export default App;
