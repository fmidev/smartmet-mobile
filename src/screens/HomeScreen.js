import React from 'react';
import Config from 'react-native-config';
import { translate } from 'react-i18next';
import i18n from 'i18next';
import { connect } from 'react-redux';
import moment from 'moment-with-locales-es6';
import {
  View, Text, StyleSheet, Image, FlatList, TouchableHighlight,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { LoadingView } from '../components';
import { tsFetch } from '../actions/TimeSeriesActions';
import { settingsInit } from '../actions/SettingsActions';
import { setLang } from '../actions/QueryParamActions';
import Images from '../assets/images';
import ListItem from '../components/ListItem';
import { converter } from '../components/Helper'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  weatherInfoContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: -40,
    marginTop: 20,
  },
  dateTextContainer: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  },
  dateText: {
    color: 'black',
  },
  weatherInfo: {
    fontSize: 50,
    color: 'black',
  },
  feelsLike: {
    fontSize: 12,
    color: 'black',
    marginTop: 32,
    marginLeft: 6,
  },
  symbolDescription: {
    fontSize: 12,
    color: 'black',
    marginTop: 0,
    marginLeft: 40,
  },
  symbol: {
    left: 50,
    marginTop: -28,
  },
  weatherDetailsContainer: {
    marginTop: 35,
    flex: 1, flexDirection: 'row', justifyContent: 'space-between'
  },
  precipitation: {
    marginLeft: 20,
  },
  celestialSymbol: {
    marginLeft: 58,
  },
  celestialTextContainer: {
    marginTop: 10,
    marginRight: 48,
  },
  windspeed: {
    marginRight: 20,
    marginTop: -20,
  },
  celestialText: {
    color: 'black',
    fontSize: 12,
  },
  precipitationText: {
    fontSize: 12,
    color: 'black',
  },
  flatListContainer: {
    flex: 1,
    marginTop: 10,
  },
  warningContainer: {
    backgroundColor: 'rgb(29,36,89)',
  },
  listHeader: {
    backgroundColor: 'lightgray',
    paddingTop: 10,
    paddingBottom: 10,
  },
});


export class HomeScreen extends React.Component {
  async onChangeLang(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem('@APP:languageCode', lang);
    } catch (error) {
      // TODO: Error handling
    }
  }

  componentDidMount() {
    this.props.setLang(i18n.language);
    this.props.settingsInit();
    this.props.tsFetch();
  }

  renderLoading() {
    return (
      <LoadingView />
    );
  }

  renderMainInfo() {
    const { t } = this.props;
    let mainInfoData = {};

    const serverTimeNearestHour = moment(this.props.tsDataObj.serverTime).add(30, 'minutes').utc().format('YYYYMMDDTHH');

    this.props.tsDataObj.data.forEach((element) => {
      if (element.utctime.substring(0, 11) === serverTimeNearestHour) {
        mainInfoData = element;
        this.props.tsDataObj.localAnalysisTime = element.time
      }
    });

    return (
      <View style={styles.topContainer}>

        <View style={styles.dateTextContainer}>
          <Text style={styles.dateText}>{moment(this.props.tsDataObj.localAnalysisTime).format('LLLL')}</Text>
        </View>

        <View style={styles.weatherInfoContainer}>

          <View>
            <Text style={styles.weatherInfo}>
              {converter(this.props.parameterUnitMap['temperature'], mainInfoData.temperature).toFixed(this.props.parameterUnitPrecisionMap['temperature'])}
              {' '}
              °{this.props.parameterUnitAbbMap['temperature']}
            </Text>
            <Text style={styles.feelsLike}>
              {`${t('common:feels like')} °`}
              {' '}
              {converter(this.props.parameterUnitMap['temperature'], mainInfoData.feelslike).toFixed(this.props.parameterUnitPrecisionMap['temperature'])}
            </Text>
          </View>

          <View style={styles.symbol}>
            <Image style={{ width: 120, height: 120 }} source={Images.symbols[mainInfoData.smartsymbol]} />
            <Text style={styles.symbolDescription}>{`${t('weather:' + mainInfoData.weather)} `} </Text>
          </View>

        </View>

        <View style={styles.weatherDetailsContainer}>

          <View style={styles.precipitation}>
            <Text>
              <Image style={{ width: 18, height: 18 }} source={require('../assets/images/precipitation-icon.png')} />
              <Text style={styles.precipitationText}>
                {mainInfoData.humidity.toFixed(0)}
                {' '}
%
                {'\n'}
                {converter(this.props.parameterUnitMap['precipitation'], mainInfoData.precipitation1h).toFixed(this.props.parameterUnitPrecisionMap['precipitation'])}
                {' '}
                {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['precipitation'])}`}
              </Text>
            </Text>
          </View>

          <View style={styles.celestialSymbol}>
            <Image style={{ width: 30, height: 30 }} source={require('../assets/images/celestial-status-icon.png')} />
          </View>
          <View style={styles.celestialTextContainer}>
            <Text style={styles.celestialText}>
              {moment(mainInfoData.sunrise).format('LT')}
              {' '}
-
              {' '}
              {moment(mainInfoData.sunset).format('LT')}
            </Text>
          </View>


          <View style={styles.windspeed}>
            <View style={{
              flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20,
            }}
            >
              <Image
                style={{
                  flex: 1,
                  width: 40,
                  height: 40,
                  transform: [{ rotate: mainInfoData.winddirection.toString() + 'deg' }]
                }}
                source={require('../assets/images/winddir-icon.png')}
              />
              <Text style={{ position: 'absolute', fontSize: 12, color: 'black' }}>{converter(this.props.parameterUnitMap['wind'], mainInfoData.windspeedms).toFixed(this.props.parameterUnitPrecisionMap['wind'])}</Text>
            </View>
          </View>

        </View>


        <TouchableHighlight onPress={() => { this.props.navigation.navigate('Warnings'); }}>
          <View style={styles.warningContainer}>
            <Text style={{
              fontSize: 16, textAlign: 'center', color: 'white', paddingTop: 26, paddingBottom: 32,
            }}
            >
              {`${t('common:warnings')}`}
            </Text>
          </View>
        </TouchableHighlight>

        <View style={styles.listHeader}>
          <Text style={{
            fontSize: 12, color: 'black', marginLeft: 5, fontWeight: 'bold',
          }}
          >
            {`${t('common:forecast')}`}
          </Text>
        </View>

      </View>
    );
  }

  getListData() {
    const listData = [];
    const dataTimeUtc = moment(this.props.tsDataObj.data[0].utctime)
    const dataTimeLocal = moment(this.props.tsDataObj.data[0].time)
    const utcLocalDiff = moment.duration(dataTimeLocal.diff(dataTimeUtc));
    const currentServerTimeUtc = moment.utc(this.props.tsDataObj.serverTime);
    const currentServerTimeLocal = currentServerTimeUtc.add(utcLocalDiff, 'hours')
    let listLength = 0;

    this.props.tsDataObj.data.forEach((element) => {
      if (element.time.substring(9, 11) === Config.WEEKDAY_LIST_FORECAST_HOUR && currentServerTimeLocal.format('DD') <= moment(element.time).format('DD') && listLength < Config.WEEKDAY_LIST_LENGTH) {
        listData.push(element);
        listLength++;
      }
    });
    return listData;
  }

  onRefresh() {
    this.props.tsFetch();
  }

  renderFlatList() {

    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.refreshLocation) {
        this.onRefresh()
        this.props.navigation.state.params.refreshLocation = false
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            style={{ flex: 1 }}
            data={this.getListData()}
            renderItem={(item) => <ListItem item={item} tsDataObj={this.props.tsDataObj} parameterUnitMap={this.props.parameterUnitMap} parameterUnitAbbMap={this.props.parameterUnitAbbMap} parameterUnitPrecisionMap={this.props.parameterUnitPrecisionMap} />}
            keyExtractor={(item) => item.time}
            scrollEnabled
            ListHeaderComponent={() => this.renderMainInfo()}
            onRefresh={() => this.onRefresh()}
            refreshing={this.props.loading}
          />
        </View>
      </View>
    );
  }

  render() {
    moment.locale(i18n.language)
    if (this.props.loading) {
      return this.renderLoading();
    }

    if (this.props.tsDataObj.data.length === 0) {
      // TODO: return this.renderNoContent();
    }
    return this.renderFlatList();
  }
}


const mapStateToProps = (state) => {
  const { loading, tsDataObj } = state.tsDataObj;
  const { parameterUnitMap } = state.parameterUnitMap
  const { parameterUnitAbbMap } = state.parameterUnitAbbMap
  const { parameterUnitPrecisionMap } = state.parameterUnitPrecisionMap
  return { loading, tsDataObj, parameterUnitMap, parameterUnitAbbMap, parameterUnitPrecisionMap };
};

export default withNavigation(connect(mapStateToProps, { tsFetch, settingsInit, setLang })(translate(['home', 'common', 'day', 'unit abbreviations'], { wait: true })(HomeScreen)));
