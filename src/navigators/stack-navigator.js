import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { SettingsButton, SearchButton, LocationButton } from '../components/Header';
import BottomTabNavigator from './bottom-tab-navigator';
import SettingsScreen from '../screens/SettingsScreen';
import SymbolsScreen from '../screens/SymbolsScreen';
import AboutScreen from '../screens/AboutScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import SearchScreen from '../screens/SearchScreen';
import WarningsScreen from '../screens/WarningsScreen';
import HeaderTitle from '../components/HeaderTitle';
import SideMenu from '../components/SideMenu';

const headerStyle = {
  headerTitleStyle: {
    fontSize: 17,
    color: 'rgb(48,49,147)',
    fontFamily: 'Roboto-Medium',
  },
  headerStyle: {
    height: 44,
    elevation: 0,
    shadowOpacity: 0,
  }
};

const mainNavigator = createStackNavigator(
  {
    Home: {
      screen: BottomTabNavigator,
      headerMode: 'none',
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: { alignSelf: 'center' },
        title: <HeaderTitle />,
        headerTitleStyle: headerStyle.headerTitleStyle,
        headerStyle: headerStyle.headerStyle,
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
      navigationOptions: ({ }) => ({
        headerTitleStyle: headerStyle.headerTitleStyle,
        headerStyle: headerStyle.headerStyle,
        animationEnabled: false,
      }),
    },
  },
  { headerLayoutPreset: 'center' },
  {
    initialRouteName: 'Home',
  },
);

const settingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ }) => ({
        headerTitleStyle: headerStyle.headerTitleStyle,
        headerStyle: headerStyle.headerStyle
      }),
    },
  },
  { headerLayoutPreset: 'center' }
);

const symbolsStack = createStackNavigator(
  {
    Symbols: {
      screen: SymbolsScreen,
      navigationOptions: ({ }) => ({
        headerTitleStyle: headerStyle.headerTitleStyle,
        headerStyle: headerStyle.headerStyle
      }),
    },
  },
  { headerLayoutPreset: 'center' }
);

const aboutStack = createStackNavigator(
  {
    About: {
      screen: AboutScreen,
      navigationOptions: ({ }) => ({
        headerTitleStyle: headerStyle.headerTitleStyle,
        headerStyle: headerStyle.headerStyle
      }),
    },
  },
  { headerLayoutPreset: 'center' }
);

const feedbackStack = createStackNavigator(
  {
    Feedback: {
      screen: FeedbackScreen,
      navigationOptions: ({ }) => ({
        headerTitleStyle: headerStyle.headerTitleStyle,
        headerStyle: headerStyle.headerStyle
      }),
    },
  },
  { headerLayoutPreset: 'center' }
);

const Drawer = createDrawerNavigator(
  {
    Home: { screen: mainNavigator },
    Settings: { screen: settingsStack },
    Symbols: { screen: symbolsStack },
    About: { screen: aboutStack },
    Feedback: { screen: feedbackStack },
  },
  {
    contentComponent: (props) => <SideMenu {...props} />,
  },
);

const App = createAppContainer(Drawer);

export default App;
