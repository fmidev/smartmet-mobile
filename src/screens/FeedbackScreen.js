import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import { translate } from 'react-i18next';

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },

});

export class FeedbackScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('feedback:feedback'),
    headerLeft: () => <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
  });

  render() {
    const { t } = this.props;
    return (
      <Text>{`${t('feedback:content')} `}</Text>
    );
  }
}

export default translate(['feedback'], { wait: true })(FeedbackScreen);
