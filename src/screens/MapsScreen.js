import Config from 'react-native-config';
import React, { Component } from 'react';
import { MapStyle } from "../MapStyle";
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import moment from 'moment-with-locales-es6';
import { LoadingView } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 41.662971
const LONGITUDE = 74.749084
const LATITUDE_DELTA = 13.5000;;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const OVERLAY_TOP_LEFT_COORDINATE = [LATITUDE + (LATITUDE_DELTA / 2), LONGITUDE - (LATITUDE_DELTA / 2)];
const OVERLAY_BOTTOM_RIGHT_COORDINATE = [LATITUDE - (LATITUDE_DELTA / 0.5), LONGITUDE + (LONGITUDE_DELTA / 0.5)];
const wmsBaseUrl = `${Config.API_URL}/wms?bbox=8766409.902202941%2C5009377.08697311%2C1.001875417394622E7%2C6261721.358716387&CRS=EPSG%3A3067&format=image%2Fpng&height=1024&layers=mobile%3Agfs%3Aprecipitation&request=getmap&service=wms&styles=&transparent=true&version=1.3.0&width=1024`
const wmsQueries = []

export default class MapsScreen extends Component {
  static propTypes = {
    provider: MapView.ProviderPropType,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      wmsIndex: 0,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      overlay: {
        bounds: [OVERLAY_TOP_LEFT_COORDINATE, OVERLAY_BOTTOM_RIGHT_COORDINATE],
      },
    };

  }

  componentDidMount() {

    this.getServerTime()
      .then((serverTimeUtc) => {
        const foobar = moment(serverTimeUtc)
        const remainder = 5 - (foobar.minute() % 5);
        const nextFiveFromServerTime = moment(foobar).add(remainder, 'minutes');

        for (let i = 0; i < Config.WMS_TIMESTEPS; i++) {
          wmsQueries.push(wmsBaseUrl + '&time=' + nextFiveFromServerTime.add(10, 'minutes').utc().format('YYYYMMDDTHHmm'))
        }

        this.getWmsImages(wmsQueries).then(img => {
          this.setState({ ...this.state, loading: false })
          this.loopState()
        })

      })
      .catch((err) => {
        console.error(err.message); // TODO: Error handling
      });

  }

  getServerTime = () => {
    const clusterInfoUrl = `${Config.API_URL}/admin?what=clusterinfo`;
    return fetch(clusterInfoUrl)
      .then((response) => {
        const serverTimeUtc = response.headers.get('Date');
        return serverTimeUtc;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getWmsImages = (wmsQueries) => {
    return Promise.all(wmsQueries.map(img => Image.prefetch(img)))
  }

  loopState = async () => {
    for (let i = 0; true; i++) {
      await this.setLoopInterval()
      this.setState({ ...this.state, wmsIndex: i % wmsQueries.length });
    }
  }

  setLoopInterval = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 200)
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingView />
      );
    }
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          customMapStyle={MapStyle}
          initialRegion={this.state.region}
        >
          <MapView.Overlay
            bounds={this.state.overlay.bounds}
            image={wmsQueries[this.state.wmsIndex]}
            opacity={0.5}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text style={styles.header}>Temperature</Text>
            <Text style={styles.date}>{moment(wmsQueries[this.state.wmsIndex].substr(wmsQueries[this.state.wmsIndex].length - 13)).format('L')}</Text>
            <Text style={styles.time}>{moment(wmsQueries[this.state.wmsIndex].substr(wmsQueries[this.state.wmsIndex].length - 13)).format('HH:mm:ss')}</Text>
          </View>
        </View>
        <View style={styles.layerButtonContainer} >
          <TouchableOpacity style={styles.layerButton} >
            <Ionicons name="logo-buffer" size={40} style={{ color: 'black', paddingTop: 2, paddingBottom: 2, paddingLeft: 6, paddingRight: 6 }} />
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    display: 'flex',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  header: {
    fontWeight: 'bold',
    paddingBottom: 5,
    fontSize: 12,
  },
  date: {
    fontSize: 10,
    textAlign: 'center',
  },
  time: {
    textAlign: 'center',
    fontSize: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layerButtonContainer: {
    bottom: 20,
    right: 20,
    position: 'absolute',
  },
  layerButton: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    top: 20,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
