import React from 'react';
import Config from 'react-native-config';
import { translate } from 'react-i18next';
import i18n from 'i18next';
import { connect } from 'react-redux';
import moment from 'moment';
import momentLocales from 'moment-with-locales-es6';
import {
  View, Text, StyleSheet, Image, FlatList, TouchableHighlight,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { LoadingView } from '../components';
import { ErrorView } from '../components';
import { tsFetch, tsFetchUpdate } from '../actions/TimeSeriesActions';
import { warningsFetch } from '../actions/WarningsActions';
import { settingsInit } from '../actions/SettingsActions';
import { setLang } from '../actions/QueryParamActions';
import Images from '../assets/images';
import ListItem from '../components/ListItem';
import { converter } from '../components/Helper'
import RainDrop from '../assets/images/icons/rainLightMode.svg';
import WindDirBg from '../assets/images/icons/windDirectionBgLightMode.svg';
import SunsetSunrise from '../assets/images/icons/sunsetSunriseLightMode.svg';
import ArrSunrise from '../assets/images/icons/arrowSunriseLightMode.svg'
import ArrSunset from '../assets/images/icons/arrowSunsetLightMode.svg'
import TemperatureTitle from '../assets/images/icons/temperatureTitleIconLightMode.svg'
import WindTitle from '../assets/images/icons/windTitleIconLightMode.svg'
import HumidityTitle from '../assets/images/icons/humidityTitleIconLightMode.svg'
const WEEKDAY_LIST_FORECAST_HOUR = 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(238,244,251)',
  },
  dateTextContainer: {
    marginTop: 4,
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
  },
  temperature: {
    fontSize: 70,
    color: 'rgb(48,49,147)',
    fontFamily: 'Roboto-Light'
  },
  feelsLike: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: 'rgb(48,49,147)',
  },
  symbolWeatherdescriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: 'rgb(48,49,147)',
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
  },
  weatherDetailsContainer: {
    marginTop: 15,
    marginBottom: 14,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalLine: {
    borderBottomColor: 'rgb(216,231,242)',
    borderBottomWidth: 1,
    paddingBottom: 17,
  },
  RainDropContainer: {
    marginLeft: 10,
  },
  celestialContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 50,
    paddingRight: 70,
  },
  celestialSymbol: {
    justifyContent: 'center',
  },
  celestialArrows: {
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  celestialTimes: {
    justifyContent: 'center',
  },
  windContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  winddirContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 2,
  },
  windspeedContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 12,
  },
  windspeedText: {
    fontSize: 14,
    color: 'rgb(48,49,147)',
    fontFamily: 'Roboto-Regular',
  },
  windarrowImgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  celestialText: {
    color: 'rgb(48,49,147)',
    fontWeight: 'bold',
    fontSize: 14,
  },
  precipitationText: {
    fontSize: 14,
    color: 'rgb(48,49,147)',
    fontFamily: 'Roboto-Regular',
  },
  flatListContainer: {
    flex: 1,
    marginTop: 10,
  },
  warningContainer: {
    backgroundColor: 'white',
    height: 81,
    borderRadius: 8,
    marginBottom: 14,
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
    top: 10, left: 20, right: 0, bottom: 0,
    position: 'absolute',
    color: 'white',
  },
  warningHeader: {
    fontSize: 14,
    color: 'rgb(48,49,147)',
    fontFamily: 'Roboto-Bold'
  },
  weekdayBarContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 7,
    paddingHorizontal: 13,
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
    fontSize: 15,
    color: 'rgb(48,49,147)',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold'
  },
  listHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    backgroundColor: 'rgb(238,244,251)',
    borderTopEndRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomColor: 'rgb(216,231,242)',
    borderBottomWidth: 0.9,
  },
  listHeaderText: {
    textTransform: 'uppercase',
    fontSize: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
  topContainer: {
    paddingHorizontal: 15,
  }
});


export class WeatherScreen extends React.Component {
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
    this.props.tsFetch().then(() => {
      if (!this.props.tsError) {
        this.props.warningsFetch()
      }
    });
  }

  renderLoading() {
    return (
      <LoadingView />
    );
  }

  renderError() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            style={{ flex: 1 }}
            ListEmptyComponent={<ErrorView t={t} />}
            onRefresh={() => this.onRefresh()}
            refreshing={this.props.warningsLoading}
          />
        </View>
      </View>
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
          <Text style={styles.dateText}>
            <Text>{momentLocales(this.props.tsDataObj.localAnalysisTime).format('dddd')}, </Text>
            <Text>{momentLocales(this.props.tsDataObj.localAnalysisTime).format('ll')}, </Text>
            <Text style={{ fontFamily: "Roboto-Bold" }}>{momentLocales(this.props.tsDataObj.localAnalysisTime).format('LT')}</Text>
          </Text>
        </View>

        {/* <Text style={{ textAlign: 'center', color: 'red' }}>{this.props.tsDataObj.coords.lat + ', ' + this.props.tsDataObj.coords.lon}</Text> */}

        <View style={styles.middleContainer}>

          <View style={styles.temperatureFeelsLikeContainer}>
            <Text style={styles.temperature}>
              {converter(this.props.parameterUnitMap['temperature'], mainInfoData.temperature).toFixed(this.props.parameterUnitPrecisionMap['temperature'])}
              °
            </Text>
            <Text style={styles.feelsLike}>
              <Text>
                {`${t('common:feels like')} `}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                {converter(this.props.parameterUnitMap['temperature'], mainInfoData.feelslike).toFixed(this.props.parameterUnitPrecisionMap['temperature'])}°
              </Text>
            </Text>
          </View>

          <View style={styles.symbolWeatherdescriptionContainer}>
            <View>
              <Image style={{ width: 120, height: 120 }} source={Images.symbols[mainInfoData.smartsymbol]} />
            </View>
          </View>

        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.weatherDetailsContainer}>

          <View style={styles.RainDropContainer}>
            <RainDrop width={28} height={28} />
          </View>

          <View style={styles.precipitationContainer}>
            <Text>
              <Text style={styles.precipitationText}>
                <Text style={{ fontFamily: 'Roboto-Bold' }}>
                  {mainInfoData.humidity.toFixed(0)}
                </Text>
                {' '}
%
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>
                  {converter(this.props.parameterUnitMap['precipitation'], mainInfoData.precipitation1h).toFixed(this.props.parameterUnitPrecisionMap['precipitation'])}
                </Text>
                {' '}
                {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['precipitation'])}`}
              </Text>
            </Text>
          </View>

          <View style={styles.celestialContainer}>
            <View style={styles.celestialSymbol}>
              <SunsetSunrise width={28} height={28} />
            </View>
            <View style={styles.celestialArrows}>
              <ArrSunrise width={14} height={18} />
              <ArrSunset width={14} height={18} />
            </View>
            <View style={styles.celestialTimes}>
              <Text style={styles.celestialText}>
                {momentLocales(mainInfoData.sunrise).format('LT')}
                {'\n'}
                {momentLocales(mainInfoData.sunset).format('LT')}
              </Text>
            </View>
          </View>

          <View style={styles.windContainer}>
            <View style={styles.winddirContainer}>
              <WindDirBg
                style={{
                  transform: [{ rotate: mainInfoData.winddirection.toString() + 'deg' }]
                }} width={30} height={30}
              />
            </View>
            <View style={styles.windspeedContainer}>
              <Text style={styles.windspeedText}>
                <Text style={{ fontWeight: 'bold' }}>
                  {converter(this.props.parameterUnitMap['wind'], mainInfoData.windspeedms).toFixed(this.props.parameterUnitPrecisionMap['wind'])}
                </Text>
                {'\n'}
                {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['wind'])}`}
              </Text>
            </View>
          </View>
        </View>

        <TouchableHighlight onPress={() => { this.props.navigation.navigate({ routeName: 'Warnings', }); }}>
          <View elevation={10} style={styles.warningContainer}>
            {!this.props.warningsLoading ? (
              <View style={styles.warningLoadingContainer}>

                <View style={styles.warningHeaderContainer}>
                  <Text style={styles.warningHeader}>
                    {`${t('common:warnings')}`}
                  </Text>
                </View>

                <View style={styles.weekdayBarContainer}>
                  {
                    this.props.warningsBarData.map((element, i) => {
                      return (
                        <View key={i} style={styles.warningBarContainer}>
                          <Text style={styles.warningDayText}>{`${t('weekday abbreviations:' + moment(element.time).format('dddd').toLowerCase())}`}</Text>
                          <View style={styles.warningBarColorContainer}>
                            {
                              element.bars.map((barElement, k) => {
                                return (
                                  <View key={k} style={{ width: barElement.width, height: 5, backgroundColor: barElement.color, }} />
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

        <View style={styles.listHeaderContainer}>
          <View style={{ marginRight: 1.5, alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius: 8, width: '31%' }}></View>
          <View style={{ marginRight: 1.5, alignItems: 'center', backgroundColor: 'white', width: '12%' }}><TemperatureTitle height={20} /></View>
          <View style={{ marginRight: 1.5, alignItems: 'center', backgroundColor: 'white', width: '27%' }}><WindTitle height={20} /></View>
          <View style={{ marginRight: 1.5, alignItems: 'center', backgroundColor: 'white', width: '14%' }}><HumidityTitle height={20} /></View>
          <View style={{ backgroundColor: 'white', alignItems: 'center', borderTopEndRadius: 8, flex: 1, width: '16%' }}></View>
        </View>

      </View >
    );
  }

  getListData() {
    const listData = [];
    const dataTimeUtc = momentLocales(this.props.tsDataObj.data[0].utctime)
    const dataTimeLocal = momentLocales(this.props.tsDataObj.data[0].time)
    const utcLocalDiff = momentLocales.duration(dataTimeLocal.diff(dataTimeUtc));
    let listLength = 0;
    const nextHourDivisibleByThreeFromServerTimeLocal = this.props.tsDataObj.nextHourDivisibleByThreeFromServerTime.clone();
    nextHourDivisibleByThreeFromServerTimeLocal.add(utcLocalDiff, 'hours')

    this.props.tsDataObj.data.forEach((element) => {
      if (parseInt(element.time.substring(9, 11)) === WEEKDAY_LIST_FORECAST_HOUR && momentLocales(element.time).isSameOrAfter(nextHourDivisibleByThreeFromServerTimeLocal.format('YYYYMMDDTHHmm'), 'day') && listLength < Config.WEEKDAY_LIST_LENGTH) {
        listData.push(element);
        listLength++;
      }
    });
    return listData;
  }

  onRefresh() {
    this.props.tsFetchUpdate().then(() => {
      if (!this.props.tsError) {
        this.props.warningsFetch()
      }
    });
  }

  refreshLocation() {
    this.props.tsFetch().then(() => {
      if (!this.props.tsError) {
        this.props.warningsFetch()
      }
    });
  }

  renderFlatList() {

    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.refreshLocation) {
        this.refreshLocation()
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
            refreshing={this.props.tsLoading}
          />
        </View>
      </View>
    );
  }

  render() {
    momentLocales.locale(i18n.language)
    if (this.props.tsLoading) {
      return this.renderLoading();
    }
    if (this.props.tsError) {
      return this.renderError();
    }
    return this.renderFlatList();
  }
}


const mapStateToProps = (state) => {
  const { tsLoading, tsError, tsDataObj } = state.tsDataObj;
  const { warningsLoading, warningsBarData } = state.warningsObj;
  const { parameterUnitMap } = state.parameterUnitMap
  const { parameterUnitAbbMap } = state.parameterUnitAbbMap
  const { parameterUnitPrecisionMap } = state.parameterUnitPrecisionMap
  return { tsLoading, tsError, tsDataObj, warningsLoading, warningsBarData, parameterUnitMap, parameterUnitAbbMap, parameterUnitPrecisionMap };
};

export default withNavigation(connect(mapStateToProps, { tsFetch, tsFetchUpdate, warningsFetch, settingsInit, setLang })(translate(['weather', 'common', 'day', 'weekday abbreviations', 'unit abbreviations'], { wait: true })(WeatherScreen)));
