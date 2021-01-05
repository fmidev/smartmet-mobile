import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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
import ArrowLeftLightMode from '../assets/images/icons/arrowLeftLightMode.svg'
import ArrowRightLightMode from '../assets/images/icons/arrowRightLightMode.svg'
import CheckActiveLightMode from '../assets/images/icons/checkActiveLightMode.svg'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  header: {
    backgroundColor: 'rgb(238,244,251)',
    color: 'rgb(48,49,147)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    paddingVertical: 20,
    paddingLeft: 20,
  },
  about: {
    color: 'black',
    backgroundColor: 'white',
    paddingTop: 30,
    paddingLeft: 10,
    paddingBottom: 30,
    textAlign: 'center',
  },
  preferences: {
    paddingTop: 15,
    paddingLeft: 17,
    paddingBottom: 15,
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  flatlistItem: {
    margin: 4,
    paddingLeft: 10,
    paddingVertical: 7,
    backgroundColor: '#FFF',
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 0,
  },
  languageListitem: {
    color: 'rgb(48,49,147)',
    fontSize: 16,
    paddingLeft: 10,
    flex: 1,
  },
  listIconRightEnd: {
    paddingRight: 20,
  },
  settingslistitem: {
    color: 'rgb(48,49,147)',
    fontSize: 16,
    textTransform: 'capitalize',
    paddingLeft: 6,
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
    paddingBottom: 15,
    paddingLeft: 10,
    textTransform: 'capitalize',
  },
  listItemRBSheetTitle: {
    fontSize: 14,
    marginLeft: 10,
  }
});

export class SettingsScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('settings:settings'),
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)} style={{ paddingLeft: 10, }}><ArrowLeftLightMode />
      </TouchableOpacity>
    )

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

  renderSeparator = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(216,231,242)',
        height: 1,
        marginHorizontal: 20,
      }}
    />
  );

  render() {
    const { t } = this.props;
    const availableLanguages = Object.keys(i18n.translator.resourceStore.data);
    const appLanguage = i18n.language;
    return (

      <View style={styles.container} >
        <ScrollView>
          <Text style={styles.header}>
            {t('settings:language')}
          </Text>


          <FlatList
            data={availableLanguages}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) => {
              return (

                <TouchableOpacity onPress={() => this.onChangeLang(item)}>
                  <View style={styles.flatlistItem} >
                    <Text style={styles.languageListitem} >{t('settings:' + item)}</Text>
                    {appLanguage === item ? <View style={styles.listIconRightEnd}><CheckActiveLightMode width={25} /></View> : null}
                  </View>
                </TouchableOpacity>


              )
            }}
            keyExtractor={(item, index) => index}
          />

          < Text style={styles.header} >
            Allow location access
          </Text >


          <FlatList
            data={['Never', 'While using the app', 'Always']}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.onChangeLang(item)}>
                  <View style={styles.flatlistItem} >
                    <Text style={styles.languageListitem} >{t('settings:' + item)}</Text>
                    {appLanguage === item ? <View style={styles.listIconRightEnd}><CheckActiveLightMode width={25} /></View> : null}
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => index}
          />



          < Text style={styles.header} >
            {t('settings:units')}
          </Text >
          <FlatList
            data={UNITS}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => this[RBSheet + item.parameterName].open()}>
                <View style={styles.flatlistItem} >
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
            Appearance
          </Text>

          <FlatList
            data={['Light mode', 'Dark mode', 'Automatic']}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.onChangeLang(item)}>
                  <View style={styles.flatlistItem} >
                    <Text style={styles.languageListitem} >{t('settings:' + item)}</Text>
                    {appLanguage === item ? <View style={styles.listIconRightEnd}><CheckActiveLightMode width={25} /></View> : null}
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => index}
          />


          <Text style={styles.header}></Text>


          <FlatList
            data={['Terms of use', 'About the app']}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.onChangeLang(item)}>
                  <View style={styles.flatlistItem} >
                    <Text style={styles.languageListitem} >{t('settings:' + item)}</Text>
                    <View style={styles.listIconRightEnd}><ArrowRightLightMode width={25} /></View>
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => index}
          />


        </ScrollView>
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
