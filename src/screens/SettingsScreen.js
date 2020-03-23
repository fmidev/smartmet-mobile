import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import { translate } from 'react-i18next';
import i18n from 'i18next';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  header: {
    paddingTop: 7,
    paddingLeft: 10,
    paddingBottom: 7,
    textTransform: 'uppercase',
  },
  about: {
    backgroundColor: 'white',
    paddingTop: 30,
    paddingLeft: 10,
    paddingBottom: 30,
    textAlign: 'center',
  },
});

export class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('settings:title'),
    headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  });

  async onChangeLang(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem('@APP:languageCode', lang);
    } catch (error) {
      // TODO: Error handling
    }
  }

  render() {
    const { t } = this.props;
    const availableLanguages = Object.keys(i18n.translator.resourceStore.data);
    const appLanguage = i18n.language;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {t('settings:language')}
        </Text>
        {availableLanguages.map((currentLang, i) => (
          <ListItem
            key={i}
            title={currentLang}
            bottomDivider
            checkmark={appLanguage === currentLang}
            onPress={() => this.onChangeLang(currentLang)}
          />
        ))}
        <Text style={styles.header}>
          {t('settings:about')}
        </Text>
        <Text style={styles.about}>
          {t('settings:aboutContent')}
        </Text>
      </View>
    );
  }
}

export default translate(['home', 'common'], { wait: true })(SettingsScreen);
