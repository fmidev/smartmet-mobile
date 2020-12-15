import React from 'react';
import {
  TouchableOpacity, Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from '../assets/images/icons/menuLightMode.svg';
import Search from '../assets/images/icons/searchLightMode.svg';
import Location from '../assets/images/icons/locationLightMode.svg';

/*
export const SettingsButton = (props) => (
  <TouchableOpacity onPress={props.onPress}><Ionicons name="ios-settings" size={25} style={{ color: 'black', marginLeft: 20 }} /></TouchableOpacity>
);
*/

export const SettingsButton = (props) => (
  <TouchableOpacity onPress={props.onPress}><Menu width={28} height={28} style={{ marginLeft: 16 }} /></TouchableOpacity>
);

export const SearchButton = (props) => (
  <TouchableOpacity onPress={props.onPress}><Search width={28} height={28} style={{ marginRight: 10 }} /></TouchableOpacity>
);

export const LocationButton = (props) => (
  <TouchableOpacity onPress={props.onPress}><Location width={28} height={28} style={{ marginRight: 16 }} /></TouchableOpacity>
);
