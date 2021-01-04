import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { translate } from 'react-i18next';
import FmiLogo from '../assets/images/fmiLogoNega.svg';
import SettingsActiveLightMode from '../assets/images/icons/settingsActiveLightMode.svg';
import WeatherActiveLightMode from '../assets/images/icons/weatherActiveLightMode.svg';
import InfoActiveLightMode from '../assets/images/icons/infoActiveLightMode.svg';
import FeedbackActiveLightMode from '../assets/images/icons/feedbackActiveLightMode.svg';

const styles = StyleSheet.create({
  container: {
    fontSize: 15,
    backgroundColor: 'rgb(48,49,147)',
    fontFamily: 'Roboto-Medium',
    paddingLeft: 15,
    paddingVertical: 15,
    height: '100%',
  },
  logoContainer: {
    paddingTop: 70,
    paddingBottom: 30,
  },
  itemText: {
    color: 'white',
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Roboto-Light',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingVertical: 15,
  },
  copyrightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  copyrightText: {
    color: 'rgb(151,152,201)',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    lineHeight: 30,
  },
});

export class SideMenu extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <FmiLogo width={107} />
        </View>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
          <View style={styles.iconTextContainer}>
            <SettingsActiveLightMode />
            <Text style={styles.itemText}>{t('settings:settings')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Symbols')}>
          <View style={styles.iconTextContainer}>
            <WeatherActiveLightMode />
            <Text style={styles.itemText}>{t('weather symbols:weather symbols')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('About')}>
          <View style={styles.iconTextContainer}>
            <InfoActiveLightMode />
            <Text style={styles.itemText}>{t('about the application:about the application')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Feedback')}>
          <View style={styles.iconTextContainer}>
            <FeedbackActiveLightMode />
            <Text style={styles.itemText}>{t('feedback:feedback')}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>
            Finnish Meteorological Institute
            {'\n'}
          Version 0.0.1
          </Text>
        </View>

      </View>
    );
  }
}

export default translate(['weather symbols', 'about the application', 'feedback'], { wait: true })(SideMenu);
