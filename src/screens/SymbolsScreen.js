import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { translate } from 'react-i18next';
import ArrowLeft from '../components/ArrowLeft'
import Images from '../assets/images';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> Light</Text>
        <Text style={styles.headerText}> Dark</Text>
      </View>
    )
  }

  render() {
    const { t } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={symbolData}
          ListHeaderComponent={() => this.renderHeader()}
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
      </View>
    );
  }
}

export default translate(['weather symbols'], { wait: true })(SymbolsScreen);
