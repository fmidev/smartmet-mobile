import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import { translate } from 'react-i18next';
import i18n from 'i18next';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";

const UNITS = [
  {
    unitName: 'Temperature',
    unitAbb: ['C', 'F']
  },
  {
    unitName: 'Precipitation',
    unitAbb: ['mm', 'in']
  },
  {
    unitName: 'Wind',
    unitAbb: ['m/s', 'km/h', 'mph', 'Bft', 'kn'],
  },
  {
    unitName: 'Pressure',
    unitAbb: ['hPa', 'inHg', 'mmHg', 'mbar'],
  },
]

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
  units: {
    margin: 0.5,
    paddingTop: 15,
    paddingLeft: 10,
    paddingBottom: 15,
    backgroundColor: '#FFF',
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 0,
  },
  settingslistitem: {
    color: 'gray',
    fontSize: 16,
  },
  rbTitle: {
    color: 'black',
    fontSize: 16,
  }
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

  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => this[RBSheet + item.unitName].open()}>
        <View style={styles.units} >
          <Text style={styles.settingslistitem} > {item.unitName} </Text>
          <RBSheet
            ref={ref => {
              this[RBSheet + item.unitName] = ref;
            }}
          >
            <View>
              <Text style={styles.rbTitle}> {item.unitName} </Text>
              <Text> {item.unitAbb.splice(',').join('\n')}</Text>
            </View>
          </RBSheet>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { t } = this.props;
    const availableLanguages = Object.keys(i18n.translator.resourceStore.data);
    const appLanguage = i18n.language;
    return (

      < View style={styles.container} >
        <Text style={styles.header}>
          {t('settings:language')}
        </Text>
        {
          availableLanguages.map((currentLang, i) => (
            <ListItem
              key={i}
              title={currentLang}
              bottomDivider
              checkmark={appLanguage === currentLang}
              onPress={() => this.onChangeLang(currentLang)}
            />
          ))
        }
        < Text style={styles.header} >
          UNITS
        </Text >
        <FlatList
          data={UNITS}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.unitName}
        />
        <Text style={styles.header}>
          {t('settings:about')}
        </Text>
        <Text style={styles.about}>
          {t('settings:aboutContent')}
        </Text>
      </View >
    );
  }
}

export default translate(['home', 'common'], { wait: true })(SettingsScreen);
