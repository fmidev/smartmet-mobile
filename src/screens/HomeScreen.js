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
import { ErrorView } from '../components';
import { tsFetch } from '../actions/TimeSeriesActions';
import { warningsFetch } from '../actions/WarningsActions';
import { settingsInit } from '../actions/SettingsActions';
import { setLang } from '../actions/QueryParamActions';
import Images from '../assets/images';
import ListItem from '../components/ListItem';
import { converter } from '../components/Helper'

const warningsMock = [
  {
    time: '20200520',
    bars: [
      {
        color: 'gray',
        width: '20%'
      },
      {
        color: 'yellow',
        width: '20%'
      },
      {
        color: 'red',
        width: '10%'
      },
      {
        color: 'green',
        width: '50%'
      },
    ],
  },
  {
    time: '20200521',
    bars: [
      {
        color: 'yellow',
        width: '20%'
      },
      {
        color: 'red',
        width: '10%'
      },
      {
        color: 'green',
        width: '50%'
      },
      {
        color: 'gray',
        width: '20%'
      },
    ],
  },
  {
    time: '20200522',
    bars: [
      {
        color: 'yellow',
        width: '20%'
      },
      {
        color: 'red',
        width: '20%'
      },
      {
        color: 'green',
        width: '60%'
      },
    ],
  },
  {
    time: '20200523',
    bars: [
      {
        color: 'green',
        width: '40%'
      },
      {
        color: 'red',
        width: '10%'
      },
      {
        color: 'yellow',
        width: '50%'
      },
    ],
  },
  {
    time: '20200524',
    bars: [
      {
        color: 'red',
        width: '90%'
      },
      {
        color: 'yellow',
        width: '5%'
      },
      {
        color: 'green',
        width: '5%'
      },
    ],
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  dateTextContainer: {
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  middleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  temperatureFeelsLikeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  temperature: {
    fontSize: 50,
    color: 'black',
  },
  feelsLike: {
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    bottom: 0,
  },
  symbolWeatherdescriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolDescription: {
    fontSize: 12,
    color: 'black',
    bottom: 0,
  },
  dateText: {
    color: 'black',
  },
  weatherDetailsContainer: {
    marginTop: 35,
    marginBottom: 10,
    paddingHorizontal: 22,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  precipitationContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginRight: 5,
  },
  celestialContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  celestialSymbol: {
    paddingRight: 7,
  },
  windspeedContainer: {
    justifyContent: 'center',
  },
  windarrowImgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
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
    flexDirection: 'row',
    backgroundColor: 'rgb(29,36,89)',
    height: 70,
  },
  warningLoadingContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningBarColorContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  warningHeaderContainer: {
    flex: 1,
    top: 5, left: 0, right: 0, bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    color: 'white',
  },
  weekdayBarContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 7,
  },
  warningBarContainer: {
    flex: 1,
    paddingHorizontal: 8,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },
  warningDayText: {
    flexDirection: 'row',
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  warningGreen: {
    width: '33%',
    height: 6,
    backgroundColor: 'green',
  },
  warningYellow: {
    width: '13%',
    height: 6,
    backgroundColor: 'yellow',
  },
  warningRed: {
    width: '53%',
    height: 6,
    backgroundColor: 'red',
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
    this.props.warningsFetch();
  }

  renderLoading() {
    return (
      <LoadingView />
    );
  }

  renderError() {
    return (
      <ErrorView />
    );
  }

  renderMainInfo() {
    const { t } = this.props;
    let mainInfoData = {};

    this.props.tsDataObj.data.forEach((element) => {
      if (element.utctime.substring(0, 11) === this.props.tsDataObj.nextHourDivisibleByThreeFromServerTime.utc().format('YYYYMMDDTHH')) {
        mainInfoData = element;
        this.props.tsDataObj.localAnalysisTime = element.time
      }
    });

    return (
      <View style={styles.topContainer}>

        <View style={styles.dateTextContainer}>
          <Text style={styles.dateText}>{moment(this.props.tsDataObj.localAnalysisTime).format('LLLL')}</Text>
        </View>

        <View style={styles.middleContainer}>

          <View style={styles.temperatureFeelsLikeContainer}>
            <Text style={styles.temperature}>
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

          <View style={styles.symbolWeatherdescriptionContainer}>
            <View>
              <Image style={{ width: 120, height: 120 }} source={Images.symbols[mainInfoData.smartsymbol]} />
            </View>
            <Text style={styles.symbolDescription}>{`${t('weather:' + mainInfoData.weather)} `} </Text>
          </View>

        </View>

        <View style={styles.weatherDetailsContainer}>

          <View style={styles.precipitationContainer}>
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

          <View style={styles.celestialContainer}>
            <View style={styles.celestialSymbol}>
              <Image style={{ width: 25, height: 25 }} source={require('../assets/images/celestial-status-icon.png')} />
            </View>
            <View>
              <Text style={styles.celestialText}>
                {moment(mainInfoData.sunrise).format('LT')}
                {' '}
  -
                {' '}
                {moment(mainInfoData.sunset).format('LT')}
              </Text>
            </View>
          </View>

          <View style={styles.windspeedContainer}>
            <View style={styles.windarrowImgContainer}
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
            {!this.props.warningsLoading ? (
              <View style={styles.warningLoadingContainer}>

                <View style={styles.warningHeaderContainer}>
                  <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                    {`${t('common:warnings')}`}
                  </Text>
                </View>

                <View style={styles.weekdayBarContainer}>
                  {
                    warningsMock.map((element, i) => {
                      return (
                        <View key={i} style={styles.warningBarContainer}>
                          <Text style={styles.warningDayText}>{moment(element.time).format('ddd').toUpperCase()}</Text>
                          <View style={styles.warningBarColorContainer}>
                            {
                              element.bars.map((barElement, k) => {
                                return (
                                  <View key={k} style={{ width: barElement.width, height: 6, backgroundColor: barElement.color, }} />
                                );

                              })
                            }
                          </View>
                        </View>
                      );
                    })
                  }
                </View>
              </View>
            ) : (
                this.renderLoading()
              )}

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

      </View >
    );
  }

  getListData() {
    const listData = [];
    const dataTimeUtc = moment(this.props.tsDataObj.data[0].utctime)
    const dataTimeLocal = moment(this.props.tsDataObj.data[0].time)
    const utcLocalDiff = moment.duration(dataTimeLocal.diff(dataTimeUtc));
    let listLength = 0;
    const nextHourDivisibleByThreeFromServerTimeLocal = this.props.tsDataObj.nextHourDivisibleByThreeFromServerTime.clone();
    nextHourDivisibleByThreeFromServerTimeLocal.add(utcLocalDiff, 'hours')

    this.props.tsDataObj.data.forEach((element) => {
      if (parseInt(element.time.substring(9, 11)) === 18 && moment(element.time).isSameOrAfter(nextHourDivisibleByThreeFromServerTimeLocal.format('YYYYMMDDTHHmm'), 'day') && listLength < Config.WEEKDAY_LIST_LENGTH) {
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
            renderItem={(item) => <ListItem item={item} tsDataObj={this.props.tsDataObj} nextHourDivisibleByThreeFromServerTime={this.props.tsDataObj.nextHourDivisibleByThreeFromServerTime} parameterUnitMap={this.props.parameterUnitMap} parameterUnitAbbMap={this.props.parameterUnitAbbMap} parameterUnitPrecisionMap={this.props.parameterUnitPrecisionMap} />}
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
    if (this.props.error) {
      return this.renderError();
    }
    return this.renderFlatList();
  }
}


const mapStateToProps = (state) => {
  const { loading, error, tsDataObj } = state.tsDataObj;
  const { warningsLoading } = state.warningsObjArr;
  const { parameterUnitMap } = state.parameterUnitMap
  const { parameterUnitAbbMap } = state.parameterUnitAbbMap
  const { parameterUnitPrecisionMap } = state.parameterUnitPrecisionMap
  return { loading, error, tsDataObj, warningsLoading, parameterUnitMap, parameterUnitAbbMap, parameterUnitPrecisionMap };
};

export default withNavigation(connect(mapStateToProps, { tsFetch, warningsFetch, settingsInit, setLang })(translate(['home', 'common', 'day', 'unit abbreviations'], { wait: true })(HomeScreen)));
