import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export const SettingsButton = (props) => (
  <TouchableOpacity onPress={props.onPress}><Ionicons name="ios-settings" size={25} style={{ color: 'black', marginLeft: 20 }} /></TouchableOpacity>
);

export const LocationButton = (props) => (
  <TouchableOpacity onPress={props.onPress}><Ionicons name="ios-navigate" size={25} style={{ color: 'black', marginRight: 20 }} /></TouchableOpacity>
);

export const SearchButton = (props) => (
  <TouchableOpacity onPress={props.onPress}><Ionicons name="ios-search" size={25} style={{ color: 'black', marginRight: 40 }} /></TouchableOpacity>
);
