import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import { translate } from 'react-i18next';

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },

});

export class AboutScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('about the application:about the application'),
    headerLeft: () => <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
  });

  render() {
    const { t } = this.props;
    return (
      <Text>{`${t('about the application:content')} `}</Text>
    );
  }
}

export default translate(['about the application'], { wait: true })(AboutScreen);
