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
  settingslistitemAbb: {
    color: 'cornflowerblue',
    fontSize: 16,
    textAlign: 'right',
    flex: 1,
    paddingRight: 15,
  },
  rbTitle: {
    color: 'black',
    fontSize: 16,
    paddingTop: 15,
    paddingLeft: 10,
  }
});

export class SettingsScreen extends React.Component {

  state = {
    selectedUnits: []
  }

  componentDidMount() {
    UNITS.forEach(element => {
      //console.log(element.unitName)
      this.getItem(element.unitName).then(res => {
        console.log(res)
        // selectedUnits.push({ unitName: element.unitName, unitAbb: res })
        this.setState(prevState => ({
          selectedUnits: [...prevState.selectedUnits, { unitName: element.unitName, unitAbb: res }]
        }))

      })
    });
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('settings:title'),
    headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  });

  async getItem(item) {
    try {
      const value = await AsyncStorage.getItem(item);
      //console.log(value);
      return value;
    } catch (error) {
      // Handle errors here
    }
  }

  async onChangeLang(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem('@APP:languageCode', lang);
    } catch (error) {
      // TODO: Error handling
    }
  }

  async onChangeUnit(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // TODO: Error handling
    }
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
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => this[RBSheet + item.unitName].open()}>
              <View style={styles.units} >
                <Text style={styles.settingslistitem} > {item.unitName} </Text>

                {
                  this.state.selectedUnits.map(key => {
                    if (key.unitName === item.unitName)
                      return (
                        <Text style={styles.settingslistitemAbb} key={key}>{key.unitAbb}</Text>
                      );
                  })
                }

                <RBSheet
                  ref={ref => {
                    this[RBSheet + item.unitName] = ref;
                  }}
                >
                  <View>
                    <Text style={styles.rbTitle}> {item.unitName} </Text>

                    {
                      item.unitAbb.map((currentUnitAbb, i) => (
                        <ListItem
                          key={i}
                          title={currentUnitAbb}
                          bottomDivider
                          checkmark={appLanguage === currentUnitAbb}
                          onPress={() => this.onChangeUnit(item.unitName, currentUnitAbb)}
                        />
                      ))
                    }
                  </View>
                </RBSheet>
              </View>
            </TouchableOpacity>
          }
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
