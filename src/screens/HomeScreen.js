import React from 'react';
import { translate } from 'react-i18next';
import i18n from 'i18next';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  View, Text, StyleSheet, Image, FlatList, TouchableHighlight,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { LoadingView } from '../components';
import { tsFetch } from '../actions/TimeSeriesActions';
import Images from '../assets/images';
import ListItem from '../components/ListItem';


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
    marginLeft: 12,
  },
  symbolDescription: {
    fontSize: 12,
    color: 'black',
    marginTop: 0,
    marginLeft: 42,
  },
  symbol: {
    left: 50,
    marginTop: -22,
  },
  weatherDetailsContainer: {
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
  },
  precipitation: {
    marginRight: 60,
    marginTop: 5,
  },
  precipitationText: {
    fontSize: 12,
    color: 'black',
  },
  celestialText: {
    color: 'black',
    fontSize: 12,
  },
  windspeed: {
    marginLeft: 40,
    marginTop: -15,
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
    console.log('serverTimeNearestHour', serverTimeNearestHour);

    this.props.tsDataObj.data.forEach((element) => {
      if (element.utctime.substring(0, 11) === serverTimeNearestHour) {
        mainInfoData = element;
        this.props.tsDataObj.localAnalysisTime = element.time
      }
    });

    return (
      <View style={styles.topContainer}>

        <View style={styles.dateTextContainer}>
          <Text style={styles.dateText}>{moment(this.props.tsDataObj.localAnalysisTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </View>

        <View style={styles.weatherInfoContainer}>

          <View>
            <Text style={styles.weatherInfo}>
              {mainInfoData.temperature}
              {' '}
°C
            </Text>
            <Text style={styles.feelsLike}>
              {`${t('common:feelsLike')} °`}
              {' '}
              {mainInfoData.feelslike}
            </Text>
          </View>

          <View style={styles.symbol}>
            <Image style={{ width: 120, height: 120 }} source={Images.symbols[mainInfoData.smartsymbol]} />
            <Text style={styles.symbolDescription}>{mainInfoData.weather}</Text>
          </View>

        </View>

        <View style={styles.weatherDetailsContainer}>

          <View style={styles.precipitation}>
            <Text>
              <Image style={{ width: 18, height: 18 }} source={require('../assets/images/precipitation-icon.png')} />
              <Text style={styles.precipitationText}>
                {mainInfoData.humidity}
                {' '}
%
                {'\n'}
                {mainInfoData.precipitation1h}
                {' '}
mm
              </Text>
            </Text>
          </View>

          <Text>
            <Image style={{ width: 30, height: 30 }} source={require('../assets/images/celestial-status-icon.png')} />
            <Text style={styles.celestialText}>
              {moment(mainInfoData.sunrise).format('HH:mm')}
              {' '}
-
              {moment(mainInfoData.sunset).format('HH:mm')}
            </Text>
          </Text>


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
                }}
                source={require('../assets/images/windspeed-icon.png')}
              />
              <Text style={{ position: 'absolute', fontSize: 12, color: 'black' }}>{mainInfoData.windspeedms}</Text>
            </View>
          </View>

        </View>


        <TouchableHighlight onPress={() => { this.props.navigation.navigate('Warnings'); }}>
          <View style={styles.warningContainer}>
            <Text style={{
              fontSize: 16, textAlign: 'center', color: 'white', paddingTop: 26, paddingBottom: 32,
            }}
            >
              Warnings - 5 days
            </Text>
          </View>
        </TouchableHighlight>

        <View style={styles.listHeader}>
          <Text style={{
            fontSize: 12, color: 'black', marginLeft: 5, fontWeight: 'bold',
          }}
          >
            10 days forecast
          </Text>
        </View>

      </View>
    );
  }

  getListData() {
    const listData = [];
    this.props.tsDataObj.data.forEach((element) => {
      if (element.time.substring(9, 11) === '14') {
        listData.push(element);
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
            renderItem={(item) => <ListItem item={item} tsDataObj={this.props.tsDataObj} />}
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
  return { loading, tsDataObj };
};

export default withNavigation(connect(mapStateToProps, { tsFetch })(translate(['home', 'common', 'day'], { wait: true })(HomeScreen)));
