import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class MapsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MAPS</Text>
      </View>
    );
  }
}
