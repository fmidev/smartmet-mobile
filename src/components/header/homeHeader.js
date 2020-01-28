import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
  settingsContainer: {

  },
  locationContainer: {
    marginLeft: 50,
    marginTop: 5,
    flexDirection: 'row',
  },
  locationText: {
    color: 'black',
    marginTop: -2,
    marginLeft: 5,
  },
  searchContainer: {
    marginLeft: 90,
  },
  navigateContainer: {
    marginLeft: 30,
  },
});

export const Logo = () => (
  <View style={styles.headerContainer}>

    <View style={styles.settingsContainer}>
      <Ionicons name="ios-settings" size={25} color="black" />
    </View>

    <View style={styles.locationContainer}>
      <Ionicons name="ios-pin" size={15} color="black" />
      <Text style={styles.locationText}>Kumpula, Helsinki</Text>
    </View>

    <View style={styles.searchContainer}>
      <Ionicons name="ios-search" size={25} color="black" />
    </View>

    <View style={styles.navigateContainer}>
      <Ionicons name="ios-navigate" size={25} color="black" />
    </View>

  </View>
);
