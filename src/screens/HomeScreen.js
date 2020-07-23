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
import { tsFetch, tsFetchUpdate } from '../actions/TimeSeriesActions';
import { warningsFetch } from '../actions/WarningsActions';
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
  listHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 18,
  },
  listHeaderText: {
    textTransform: 'uppercase',
    fontSize: 10,
    color: 'black',
    paddingHorizontal: 10,
  }
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
    this.props.tsFetch().then(() => {
      if (!this.props.error) {
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
          <Text style={styles.dateText}>{moment(this.props.tsDataObj.localAnalysisTime).format('LLLL')}</Text>
        </View>

        {/* <Text style={{ textAlign: 'center', color: 'red' }}>{this.props.tsDataObj.coords.lat + ', ' + this.props.tsDataObj.coords.lon}</Text> */}

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

        <TouchableHighlight onPress={() => { this.props.navigation.navigate({ routeName: 'Warnings', }); }}>
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
                    this.props.warningsBarData.map((element, i) => {
                      return (
                        <View key={i} style={styles.warningBarContainer}>
                          <Text style={styles.warningDayText}>{moment(element.time).format('ddd').toUpperCase()}</Text>
                          <View style={styles.warningBarColorContainer}>
                            {
                              element.bars.map((barElement, k) => {
                                return (
                                  <View key={k} style={{ width: barElement.width, height: 4, backgroundColor: barElement.color, }} />
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
          <Text style={styles.listHeaderText}>{`${t('parameter abbreviations:weather symbol')}`}</Text>
          <Text style={styles.listHeaderText}>{`${t('parameter abbreviations:temperature')}`}</Text>
          <Text style={styles.listHeaderText}>{`${t('parameter abbreviations:wind direction')}`}</Text>
          <Text style={styles.listHeaderText}>{`${t('parameter abbreviations:wind speed')}`}</Text>
          <Text style={styles.listHeaderText}>{`${t('parameter abbreviations:humidity')}`}</Text>
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
    this.props.tsFetchUpdate().then(() => {
      if (!this.props.error) {
        this.props.warningsFetch()
      }
    });
  }

  refreshLocation() {
    this.props.tsFetch().then(() => {
      if (!this.props.error) {
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
    moment.locale(i18n.language)
    if (this.props.tsLoading) {
      return this.renderLoading();
    }
    if (this.props.error) {
      return this.renderError();
    }
    return this.renderFlatList();
  }
}


const mapStateToProps = (state) => {
  const { tsLoading, error, tsDataObj } = state.tsDataObj;
  const { warningsLoading, warningsBarData } = state.warningsObj;
  const { parameterUnitMap } = state.parameterUnitMap
  const { parameterUnitAbbMap } = state.parameterUnitAbbMap
  const { parameterUnitPrecisionMap } = state.parameterUnitPrecisionMap
  return { tsLoading, error, tsDataObj, warningsLoading, warningsBarData, parameterUnitMap, parameterUnitAbbMap, parameterUnitPrecisionMap };
};

export default withNavigation(connect(mapStateToProps, { tsFetch, tsFetchUpdate, warningsFetch, settingsInit, setLang })(translate(['home', 'common', 'day', 'unit abbreviations'], { wait: true })(HomeScreen)));
