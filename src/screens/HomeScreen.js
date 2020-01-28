import React from 'react';
import {
  View, Text, StyleSheet, Image, FlatList, ScrollView,
} from 'react-native';
import { Logo } from '../components/header/homeHeader';

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
  location: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  locationText: {
    color: 'black',
    marginTop: -3,
    marginLeft: 5,
  },
  weatherInfo: {
    fontSize: 50,
    color: '#E6004C',
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
  listItem: {
    margin: 0.5,
    padding: 0,
    backgroundColor: '#FFF',
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 0,
  },
  flatListContainer: {
    flex: 1,
    marginTop: 10,
  },
});

function Item({ item }) {
  return (
    <View style={styles.listItem}>

      <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.time}</Text>
      </View>

      <Image source={require('../assets/weather_symbol.png')} />

      <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
        <Text style={{ color: 'red' }}>{item.temperature}</Text>
      </View>

      <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
        <Text style={{ color: 'green' }}>
          {item.windspeedms}
          {' '}
          m/s
        </Text>
      </View>

      <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
        <Text>{item.humidity}</Text>
      </View>

    </View>
  );
}

export default class HomeScreen extends React.Component {
  static navigationOptions = () => ({
    headerTitle: () => <Logo />,
    headerBackTitle: 'Warnings',
    headerLayoutPreset: 'center',
  });

  state = {
    data: [
      {
        time: '17:00',
        humidity: `${Math.floor(Math.random() * 100) + 1} %`,
        temperature: `${Math.floor(Math.random() * 10) + 0}°`,
        windspeedms: Math.floor(Math.random() * 10) + 0,
      },
      {
        time: '18:00',
        humidity: `${Math.floor(Math.random() * 100) + 1} %`,
        temperature: `${Math.floor(Math.random() * 10) + 0}°`,
        windspeedms: Math.floor(Math.random() * 10) + 0,
      },
      {
        time: '19:00',
        humidity: `${Math.floor(Math.random() * 100) + 1} %`,
        temperature: `${Math.floor(Math.random() * 10) + 0}°`,
        windspeedms: Math.floor(Math.random() * 10) + 0,
      },
      {
        time: '20:00',
        humidity: `${Math.floor(Math.random() * 100) + 1} %`,
        temperature: `${Math.floor(Math.random() * 10) + 0}°`,
        windspeedms: Math.floor(Math.random() * 10) + 0,
      },
      {
        time: '21:00',
        humidity: `${Math.floor(Math.random() * 100) + 1} %`,
        temperature: `${Math.floor(Math.random() * 10) + 0}°`,
        windspeedms: Math.floor(Math.random() * 10) + 0,
      },
      {
        time: '22:00',
        humidity: `${Math.floor(Math.random() * 100) + 1} %`,
        temperature: `${Math.floor(Math.random() * 10) + 0}°`,
        windspeedms: Math.floor(Math.random() * 10) + 0,
      },
      {
        time: '23:00',
        humidity: `${Math.floor(Math.random() * 100) + 1} %`,
        temperature: `${Math.floor(Math.random() * 10) + 0}°`,
        windspeedms: Math.floor(Math.random() * 10) + 0,
      },
      {
        time: '00:00',
        humidity: `${Math.floor(Math.random() * 100) + 1} %`,
        temperature: `${Math.floor(Math.random() * 10) + 0}°`,
        windspeedms: Math.floor(Math.random() * 10) + 0,
      },
    ],
  }


  render() {
    return (

      <ScrollView>

        <View style={styles.container}>

          <View style={styles.topContainer}>

            <View style={styles.dateTextContainer}>
              <Text style={styles.dateText}>Monday 27 January 16:13</Text>
            </View>

            <View style={styles.weatherInfoContainer}>

              <View>
                <Text style={styles.weatherInfo}>16°c</Text>
                <Text style={styles.feelsLike}>Feels like 13°</Text>
              </View>

              <View style={styles.symbol}>
                <Image style={{ width: 120, height: 120 }} source={require('../assets/sunny.png')} />
                <Text style={styles.symbolDescription}>Sunny</Text>
              </View>

            </View>

            <View style={styles.weatherDetailsContainer}>

              <View style={styles.precipitation}>
                <Text>
                  <Image style={{ width: 18, height: 18 }} source={require('../assets/precipitation-icon.png')} />
                  <Text style={styles.precipitationText}>
                    40 %
                    {'\n'}
                    0.1 mm
                  </Text>
                </Text>
              </View>

              <Text>
                <Image style={{ width: 30, height: 30 }} source={require('../assets/celestial-status-icon.png')} />
                <Text style={styles.celestialText}>
                  08:47 - 16:19
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
                    source={require('../assets/windspeed-icon.png')}
                  />
                  <Text style={{ position: 'absolute', fontSize: 12, color: 'black' }}>6</Text>
                </View>
              </View>

            </View>

          </View>

          <View style={styles.flatListContainer}>
            <FlatList
              style={{ flex: 1 }}
              data={this.state.data}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.time}
              scrollEnabled={false}
            />
          </View>

        </View>


      </ScrollView>

    );
  }
}
