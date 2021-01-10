import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { translate } from 'react-i18next';
import ArrowLeft from '../components/ArrowLeft'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 10,
    height: '100%',
    alignItems: 'center',
  },
  contentText: {
    fontFamily: 'Roboto-Regular',
    color: 'rgb(48,49,147)',
  },
  feedbackButton: {
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(48,49,147)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff'
  },
  feedbackButtonText: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  }
});

export class FeedbackScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('feedback:feedback'),
    headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack(null)} style={{ paddingLeft: 10, }}><ArrowLeft /></TouchableOpacity>)
  });

  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.contentText}>Use the Send feedback button to give us feedback on the application. The button will take you to your mobile phone's email program. {'\n\n'}{`${t('feedback:content')} `}</Text>
        <View style={{ flex: 1, paddingTop: 30, width: '80%' }}>
          <TouchableOpacity
            style={styles.feedbackButton}
            onPress={() => Linking.openURL('mailto:support@example.com?subject=SmartMet Mobile')}
            underlayColor='#fff'>
            <Text style={styles.feedbackButtonText}>SEND FEEDBACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default translate(['feedback'], { wait: true })(FeedbackScreen);
