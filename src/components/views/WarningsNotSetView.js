import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontWeight: 'bold',
    fontSize: 32,
  },
});

const WarningsNotSetView = () => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>NO WARNINGS SET</Text>
    </View>
  );
};

export { WarningsNotSetView };
