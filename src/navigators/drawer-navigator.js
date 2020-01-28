import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import BottomTabNavigator from './bottom-tab-navigator';
import { SettingsNavigator } from './screen-stack-navigators';

const DrawerNavigator = createDrawerNavigator({
  Home: BottomTabNavigator,
  Settings: SettingsNavigator,
});

const Drawer = createAppContainer(DrawerNavigator);

export default Drawer;
