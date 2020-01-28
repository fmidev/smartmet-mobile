import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { HeaderBackButton } from 'react-navigation-stack';
import { Logo } from '../components/header/header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    headerTitle: () => <Logo />,
    headerBackTitle: 'Settings',
    headerLayoutPreset: 'center',
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>SETTINGS</Text>
      </View>
    );
  }
}
