import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Logo = () => (
  <View>
    <Image
      source={require('../../assets/fmi_logo.png')}
      resizeMode="contain"
      style={{ width: 98 }}
    />
  </View>
);

export const MenuButton = (props) => (
  <TouchableOpacity onPress={props.onPress}><Icon name="md-menu" size={30} style={{ color: 'black', paddingLeft: 10 }} /></TouchableOpacity>
);
