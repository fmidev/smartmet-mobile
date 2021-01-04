import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';


const styles = StyleSheet.create({
  container: {
    color: 'black',
  },

});

export class FeedbackScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('settings:settings'),
    headerLeft: () => <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
  });

  render() {
    return (
      <Text>
        FEEDBACK
      </Text>
    );
  }
}

export default FeedbackScreen;
