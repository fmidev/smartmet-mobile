import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { translate } from 'react-i18next';
import ArrowLeft from '../components/ArrowLeft'
import Images from '../assets/images';
import FeelsLikeNoColor from '../assets/images/icons/feelsLikeNoColor.svg';
import RainDrop from '../assets/images/icons/rainLightMode.svg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: 10,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  headerText: {
    paddingHorizontal: 15,
    paddingTop: 15,
    fontFamily: 'Roboto-Bold',
    color: 'rgb(48,49,147)',
  },
  descriptionText: {
    flex: 1,
    paddingHorizontal: 15,
    fontFamily: 'Roboto-Regular',
    color: 'rgb(48,49,147)',
  },
  iconWrapper: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  precipitationText: {
    fontSize: 14,
    color: 'rgb(48,49,147)',
    fontFamily: 'Roboto-Regular',
  },
  iconText: {
    fontFamily: 'Roboto-Regular',
    color: 'rgb(48,49,147)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '25%'
  },
  iconDescription: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 50
  }
});

let symbolData = []

Object.entries(Images.symbols).map(([key, value]) => {
  if (key < 100) {
    symbolData.push({ daySrc: value.src, nightSrc: Images.symbols[parseInt(key) + 100].src, description: value.description })
  }
})

export class SymbolsScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('weather symbols:weather symbols'),
    headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack(null)} style={{ paddingLeft: 10, }}><ArrowLeft /></TouchableOpacity>)
  });

  renderHeader() {
    return (
      <View>
        <View style={styles.iconWrapper}>
          <View style={styles.iconContainer}>
            <View style={styles.feelsLikeIcon}>

              <View style={{ alignItems: 'center', }}>
                <FeelsLikeNoColor style={{ color: 'rgb(57,100,223)' }} width={45} height={45} />
                <Text style={{ position: 'absolute', top: 21, color: 'white', fontFamily: 'Roboto-Regular' }}>
                  <Text style={styles.collapsableContentText}>+9°</Text>
                </Text>
              </View>

            </View>

          </View>

          <View style={styles.iconDescription}>
            <Text style={styles.iconText}>Feels like icon</Text>
          </View>

        </View >

        <View style={styles.iconWrapper}>

          <View style={styles.iconContainer}>
            <View style={styles.RainDropContainer}>
              <RainDrop width={28} height={28} />
            </View>
            <Text>
              <Text style={styles.precipitationText}>
                <Text style={{ fontFamily: 'Roboto-Bold' }}>
                  10
             </Text>
                {' '}
%
             {'\n'}
                <Text style={{ fontWeight: 'bold' }}>
                  0,1
             </Text>
                {' '}
             mm
           </Text>
            </Text>
          </View>

          <View style={styles.iconDescription}>
            <Text style={styles.iconText}>Forecast probability of precipitation (10%) and one-hour precipitation amount (0.1 mm).</Text>
          </View>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}> Light</Text>
          <Text style={styles.headerText}> Dark</Text>
        </View>
      </View >
    )
  }

  render() {
    const { t } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={symbolData}
          ListHeaderComponent={() => this.renderHeader()}
          keyExtractor={(item) => item.description}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", alignItems: 'center', }}>
              <Image source={item.daySrc}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  margin: 8
                }}
              />
              <Image source={item.nightSrc}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  margin: 8
                }}
              />
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
          )}
        />
      </View >
    );
  }
}

export default translate(['weather symbols'], { wait: true })(SymbolsScreen);
