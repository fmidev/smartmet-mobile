import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { MenuButton, Logo } from '../components/header/header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class MapsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => <MenuButton onPress={() => navigation.openDrawer()} />,
    headerTitle: () => <Logo />,
    headerBackTitle: 'Maps',
    headerLayoutPreset: 'center',
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>MAPS</Text>
      </View>
    );
  }
}
