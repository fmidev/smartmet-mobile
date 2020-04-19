import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import { translate } from 'react-i18next';
import i18n from 'i18next';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import { settingsChange } from '../actions/SettingsActions';
import { setLang } from '../actions/QueryParamActions';
import { tsFetchUpdate } from '../actions/TimeSeriesActions';
import { UNITS } from '../Constants';
import { connect } from 'react-redux';
import { asyncStorageSetItem } from '../components/Helper'

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
  header: {
    color: 'black',
    paddingTop: 7,
    paddingLeft: 10,
    paddingBottom: 7,
    textTransform: 'uppercase',
  },
  about: {
    color: 'black',
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
  listItemLanguages: {
    marginLeft: 4,
    color: 'black',
    fontSize: 16,
  },
  settingslistitem: {
    color: 'black',
    fontSize: 16,
    textTransform: 'capitalize',
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
    textTransform: 'capitalize',
  },
  listItemRBSheetTitle: {
    fontSize: 14,
  }
});

export class SettingsScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('settings:settings'),
    headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  });

  async onChangeLang(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem('@APP:languageCode', lang);
      this.props.setLang(i18n.language);
      this.props.tsFetchUpdate();
    } catch (error) {
      // TODO: Error handling
    }
  }

  async onChangeUnit(key, value) {
    value = value.toString()
    asyncStorageSetItem(key, value).then(() => {
      this.props.settingsChange(key, value);
    }).catch((error) => {
      console.log('Error', error);
    });
  }

  render() {
    const { t } = this.props;
    const availableLanguages = Object.keys(i18n.translator.resourceStore.data);
    const appLanguage = i18n.language;
    return (

      <View style={styles.container} >
        <Text style={styles.header}>
          {t('settings:language')}
        </Text>
        {
          availableLanguages.map((currentLang, i) => (
            <ListItem
              key={i}
              title={<Text style={styles.listItemLanguages} >{t('settings:' + currentLang)}</Text>
              }
              bottomDivider
              checkmark={appLanguage === currentLang}
              onPress={() => this.onChangeLang(currentLang)}
            />
          ))
        }
        < Text style={styles.header} >
          {t('settings:units')}
        </Text >
        <FlatList
          data={UNITS}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => this[RBSheet + item.parameterName].open()}>
              <View style={styles.units} >
                <Text style={styles.settingslistitem} >  {t('settings:' + item.parameterName)} </Text>
                <Text style={styles.settingslistitemAbb} >{t('unit abbreviations:' + this.props.parameterUnitAbbMap[item.parameterName])}</Text>
                <RBSheet
                  ref={ref => {
                    this[RBSheet + item.parameterName] = ref;
                  }}
                  height={300}
                >
                  <View>
                    <Text style={styles.rbTitle}>  {t('settings:' + item.parameterName)} </Text>

                    {
                      item.unitTypes.map((currentUnitAbb) => (
                        <ListItem
                          key={currentUnitAbb.unitAbb}
                          title={t('unit abbreviations:' + currentUnitAbb.unitAbb)}
                          titleStyle={styles.listItemRBSheetTitle}
                          bottomDivider
                          onPress={() => { this[RBSheet + item.parameterName].close(); this.onChangeUnit(item.parameterName, currentUnitAbb.unitId); }}
                        />
                      ))
                    }
                  </View>
                </RBSheet>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={(item) => item.parameterName}
        />
        <Text style={styles.header}>
          {t('settings:about')}
        </Text>
        <Text style={styles.about}>
          FMI 2020
        </Text>
      </View >
    );
  }
}

const mapStateToProps = (state) => {
  const { parameterUnitMap } = state.parameterUnitMap
  const { parameterUnitAbbMap } = state.parameterUnitAbbMap
  return { parameterUnitMap, parameterUnitAbbMap };
};

export default connect(mapStateToProps, { settingsChange, setLang, tsFetchUpdate })(translate(['settings', 'unit abbreviations'], { wait: true })(SettingsScreen));
