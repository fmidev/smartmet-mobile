import Config from 'react-native-config';
import React, { Component } from 'react';
import { MapStyle } from "../MapStyle";
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import MapView from 'react-native-maps';
import RBSheet from "react-native-raw-bottom-sheet";
import moment from 'moment-with-locales-es6';
import { LoadingView } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const parseString = require('react-native-xml2js').parseString;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 41.662971
const LONGITUDE = 74.749084
const LATITUDE_DELTA = 13.5000;;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const OVERLAY_TOP_LEFT_COORDINATE = [LATITUDE + (LATITUDE_DELTA / 2), LONGITUDE - (LATITUDE_DELTA / 2)];
const OVERLAY_BOTTOM_RIGHT_COORDINATE = [LATITUDE - (LATITUDE_DELTA / 0.5), LONGITUDE + (LONGITUDE_DELTA / 0.5)];
const wmsBaseUrl = `${Config.API_URL}/wms?bbox=8766409.902202941%2C5009377.08697311%2C1.001875417394622E7%2C6261721.358716387&CRS=EPSG%3A3067&format=image%2Fpng&height=1024&request=getmap&service=wms&styles=&transparent=true&version=1.3.0&width=1024`
let wmsQueries = []
const layerObj = {}

export default class MapsScreen extends Component {
  static propTypes = {
    provider: MapView.ProviderPropType,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      wmsIndex: 0,
      layerIndex: 0,
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
    this.createWmsQueries()
    this.loopState()
  }

  createWmsQueries = () => {
    this.getTimeAndLayers()
      .then(() => {
        const serverTimeUtc = moment(layerObj.serverTimeUtc)
        const remainder = 5 - (serverTimeUtc.minute() % 5);
        const nextFiveFromServerTime = moment(serverTimeUtc).add(remainder, 'minutes');

        for (let i = 0; i < Config.WMS_TIMESTEPS; i++) {
          wmsQueries.push(wmsBaseUrl + '&layers=' + layerObj.layers[this.state.layerIndex] + '&time=' + nextFiveFromServerTime.add(10, 'minutes').utc().format('YYYYMMDDTHHmm'))
        }

        this.getWmsImages(wmsQueries).then(img => {
          this.setState({ ...this.state, loading: false })

        })

      })
      .catch((err) => {
        console.error(err.message); // TODO: Error handling
      });
  }

  getTimeAndLayers = async () => {

    const getCapabilitiesUrl = `${Config.API_URL}/wms?service=WMS&version=1.3.0&request=GetCapabilities`;
    const response = await fetch(getCapabilitiesUrl).catch((err) => {
      console.log('Error fetching the feed: ', err)
    });
    const responseText = await response.text();
    const serverTimeUtc = response.headers.get('Date');

    parseString(responseText, function (err, result) {
      const layerArr = result['WMS_Capabilities']['Capability'][0]['Layer'][0]['Layer']
        .filter(element => element.Name[0].includes(Config.WMS_CUSTOMER))
        .map(element => element.Name[0])
      layerObj.serverTimeUtc = serverTimeUtc
      layerObj.layers = layerArr
    });

  }

  getWmsImages = (wmsQueries) => {
    return Promise.all(wmsQueries.map(img => Image.prefetch(img)))
  }

  loopState = async () => {
    console.log('loopState')
    let layerIndex = this.state.layerIndex
    for (let i = 0; true; i++) {
      console.log('loopState FOR')
      await this.wait(600)
      if (layerIndex !== this.state.layerIndex) {
        i = 0;
        layerIndex = this.state.layerIndex;
      }
      this.setState({ ...this.state, wmsIndex: i % wmsQueries.length });
    }
  }

  wait = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms)
    })
  }

  onChangeLayer(layer) {
    this.setState({ ...this.state, loading: true, wmsIndex: 0, layerIndex: layerObj.layers.indexOf(layer) })
    wmsQueries = []
    this.createWmsQueries()
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
            <Text style={styles.header}>{layerObj.layers[this.state.layerIndex].substr(layerObj.layers[this.state.layerIndex].indexOf(':') + 1)}</Text>
            <Text style={styles.date}>{moment(wmsQueries[this.state.wmsIndex].substr(wmsQueries[this.state.wmsIndex].length - 13)).format('L')}</Text>
            <Text style={styles.time}>{moment(wmsQueries[this.state.wmsIndex].substr(wmsQueries[this.state.wmsIndex].length - 13)).format('HH:mm:ss')}</Text>
          </View>
        </View>
        <View style={styles.layerButtonContainer} >
          <TouchableOpacity style={styles.layerButton} onPress={() => this[RBSheet].open()}>
            <View >
              <RBSheet
                ref={ref => {
                  this[RBSheet] = ref;
                }}
                height={420}
              >
                <View>
                  {
                    layerObj.layers.map((currentLayer) => (
                      <ListItem
                        key={currentLayer}
                        containerStyle={styles.layersList}
                        title={<Text style={styles.layerTitle} >{currentLayer.substr(currentLayer.indexOf(':') + 1)}</Text>
                        }
                        bottomDivider
                        onPress={() => { this[RBSheet].close(); this.onChangeLayer(currentLayer); }}
                      />
                    ))
                  }
                </View>
              </RBSheet>
            </View>
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
    fontSize: 16,
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
  },
  time: {
    textAlign: 'center',
    fontSize: 14,
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
  layersList: {
    padding: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: 'black',
  },
  layerTitle: {
    fontSize: 18,
    textTransform: 'capitalize',
  }
});
