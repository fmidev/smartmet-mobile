import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontWeight: 'bold',
    fontSize: 32,
  },
});

const ErrorView = ({ t }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{`${t('common:server error')}`} </Text>
    </View>
  );
};

export { ErrorView };
