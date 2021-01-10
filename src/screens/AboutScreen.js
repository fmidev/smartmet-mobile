import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';
import ArrowLeft from '../components/ArrowLeft'

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },

});

export class AboutScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('about the application:about the application'),
    headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack(null)} style={{ paddingLeft: 10, }}><ArrowLeft /></TouchableOpacity>)
  });

  render() {
    const { t } = this.props;
    return (
      <Text>{`${t('about the application:content')} `}</Text>
    );
  }
}

export default translate(['about the application'], { wait: true })(AboutScreen);
