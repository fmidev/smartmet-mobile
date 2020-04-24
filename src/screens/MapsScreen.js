import Config from 'react-native-config';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, {
  ProviderPropType,
  WMSTile,
} from 'react-native-maps';
import { MapStyle } from "../MapStyle";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 41.662971
const LONGITUDE = 74.749084
const LATITUDE_DELTA = 13.5000;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const times = ['20200425T085000', '20200426T085010', '20200427T085020', '20200428T085030', '20200429T085040']

class MapsScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      wms: {
        apiUrl: Config.API_URL,
        service: 'wms',
        version: '1.3.0',
        request: 'getmap',
        format: 'image/png',
        transparent: 'true',
        layers: 'kalnur:gfs:temperature',
        time: '20200424T085000',
        wmsWidth: '{width}',
        wmsHeight: '{height}',
        crs: 'EPSG:3067',
        styles: '',
        bbox: '{minX},{minY},{maxX},{maxY}'
      }
    };
  }

  componentDidMount() {
    console.log('this.state', this.state)

    times.forEach(element => {
      let wms = { ...this.state.wms }
      wms.time = element;
      this.interval = setInterval(() => this.setState({ wms }), 1500);
    });

    console.log('this.state updated', this.state)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { region, wms } = this.state;
    return (
      <View style={mapsStyles.container}>
        <MapView
          provider={this.props.provider}
          //mapType={MAP_TYPES.SATELLITE}
          style={mapsStyles.map}
          customMapStyle={MapStyle}
          initialRegion={region}
        >
          <WMSTile
            urlTemplate={wms.apiUrl + '/wms?service=' + wms.service + '&version=' + wms.version + '&request=' + wms.request + '&format=' + wms.format + '&transparent=' + wms.transparent + '&layers=' + wms.layers + '&time=' + wms.time + '&width=' + wms.wmsWidth + '&height=' + wms.wmsHeight + '&CRS=' + wms.crs + '&styles=' + wms.styles + '&bbox=' + wms.bbox}
            zIndex={1}
            opacity={0.5}
            tileSize={512}
            epsgSpec={'EPSG:4326'}
          />
        </MapView>
      </View>
    );
  }
}

MapsScreen.propTypes = {
  provider: ProviderPropType,
};

const mapsStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default MapsScreen;
