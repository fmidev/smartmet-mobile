import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
} from 'react-native';
import { translate } from 'react-i18next';
import i18n from 'i18next';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';
import { settingsChange } from '../actions/SettingsActions';
import { setLang } from '../actions/QueryParamActions';
import { tsFetchUpdate } from '../actions/TimeSeriesActions';
import { UNITS } from '../Constants';
import { asyncStorageSetItem } from '../components/Helper';
import CheckActiveLightMode from '../assets/images/icons/checkActiveLightMode.svg';
import ArrowLeft from '../components/ArrowLeft';
import CloseLightMode from '../assets/images/icons/closeLightMode.svg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: 'rgb(238,244,251)',
    borderTopColor: 'rgb(216,231,242)',
    borderBottomColor: 'rgb(216,231,242)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    color: 'rgb(48,49,147)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    paddingVertical: 20,
    paddingLeft: 20,
  },
  flatlistItem: {
    margin: 4,
    paddingVertical: 6.5,
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  languageListitemText: {
    paddingLeft: 16,
    color: 'rgb(48,49,147)',
    fontSize: 16,
    flex: 1,
  },
  listIconRightEnd: {
    paddingRight: 20,
    maxHeight: 10,
  },
  settingslistitem: {
    paddingLeft: 8,
    color: 'rgb(48,49,147)',
    fontSize: 16,
  },
  settingslistitemAbb: {
    color: 'rgb(58,102,227)',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: 'right',
    flex: 1,
    paddingRight: 25,
  },
  rbContainer: {
    flex: 1,
    paddingTop: 20,
  },
  rbTitle: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  rbTitleText: {
    color: 'rgb(48,49,147)',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    textTransform: 'capitalize',
  },
  rbCloseButton: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  listItemRBSheetTitle: {
    paddingLeft: 6,
    color: 'rgb(48,49,147)',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  listItemDivider: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(216,231,242)',
    height: 1,
    marginHorizontal: 20,
  },
});

export class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('settings:settings'),
    headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack(null)} style={{ paddingLeft: 10 }}><ArrowLeft /></TouchableOpacity>),
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
    value = value.toString();
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

      <View style={styles.container}>

        <Text style={styles.header}>
          {t('settings:language')}
        </Text>

        <FlatList
          data={availableLanguages}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.onChangeLang(item)}>
              <View style={styles.flatlistItem}>
                <Text style={styles.languageListitemText}>{t(`settings:${item}`)}</Text>
                {appLanguage === item ? <View style={styles.listIconRightEnd}><CheckActiveLightMode /></View> : null}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.toString()}
        />

        <Text style={styles.header}>
          {t('settings:units')}
        </Text>
        <FlatList
          data={UNITS}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this[RBSheet + item.parameterName].open()}>
              <View style={styles.flatlistItem}>
                <Text style={styles.settingslistitem}>
                  {' '}
                  {t(`settings:${item.parameterName}`)}
                  {' '}
                </Text>
                <Text style={styles.settingslistitemAbb}>
                  {item.parameterName === 'temperature' ? '°' : null}
                  {t(`unit abbreviations:${this.props.parameterUnitAbbMap[item.parameterName]}`)}
                </Text>
                <RBSheet
                  ref={(ref) => {
                    this[RBSheet + item.parameterName] = ref;
                  }}
                  height={300}
                  customStyles={{
                    container: {
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    },
                  }}
                >
                  <View style={styles.rbContainer}>

                    <View style={styles.rbTitle}>
                      <Text style={styles.rbTitleText}>{t(`settings:${item.parameterName}`)}</Text>
                      <View style={styles.rbCloseButton}>
                        <TouchableOpacity onPress={() => this[RBSheet + item.parameterName].close()}><CloseLightMode width={35} /></TouchableOpacity>
                      </View>
                    </View>

                    {
                      item.unitTypes.map((currentUnitAbb) => (
                        <View key={currentUnitAbb.unitId} >
                          <ListItem
                            containerStyle={{ paddingVertical: 12 }}
                            key={currentUnitAbb.unitId}
                            leftElement={() => (
                              <View>
                                <Text style={styles.listItemRBSheetTitle}>
                                  {item.parameterName === 'temperature' ? '°' : null}
                                  {t(`unit abbreviations:${currentUnitAbb.unitAbb}`)}
                                </Text>
                              </View>
                            )}
                            rightElement={currentUnitAbb.unitAbb === this.props.parameterUnitAbbMap[item.parameterName] ? (
                              <View style={{
                                paddingBottom: 0, paddingTop: 0, paddingRight: 8, maxHeight: 10, justifyContent: 'center',
                              }}
                              >
                                <CheckActiveLightMode />
                              </View>
                            ) : null}
                            onPress={() => { this.onChangeUnit(item.parameterName, currentUnitAbb.unitId); }}
                          />
                          <View style={styles.listItemDivider} />

                        </View>
                      ))
                    }
                  </View>
                </RBSheet>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.parameterName}
        />

        <Text style={styles.header} />

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { parameterUnitMap } = state.parameterUnitMap;
  const { parameterUnitAbbMap } = state.parameterUnitAbbMap;
  return { parameterUnitMap, parameterUnitAbbMap };
};

export default connect(mapStateToProps, { settingsChange, setLang, tsFetchUpdate })(translate(['settings', 'unit abbreviations'], { wait: true })(SettingsScreen));
