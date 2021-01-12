import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
});

export class AboutScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('about the application:about the application'),
    headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack(null)} style={{ paddingLeft: 10, }}><ArrowLeft /></TouchableOpacity>)
  });

  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.contentText}>{`${t('about the application:content')} `}the Finnish Meteorological Institute.</Text>
      </View>
    );
  }
}

export default translate(['about the application'], { wait: true })(AboutScreen);
