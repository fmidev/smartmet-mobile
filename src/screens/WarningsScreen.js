import {
  View, Text, StyleSheet, FlatList, TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment-with-locales-es6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const warningsData = [
  {
    warningType: "Wind",
    icon: "ios-move"
  },
  {
    warningType: "Flood",
    icon: "ios-water",
  },
  {
    warningType: "Thunderstorm",
    icon: "ios-thunderstorm",
  },
  {
    warningType: "Forest fire",
    icon: "md-bonfire",
  },
]

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

export default class WarningsScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isHidden: true }
  }

  toggleListItem = () => {
    console.log('toggleListItem')
    this.setState({ isHidden: !this.state.isHidden })
  }

  render() {
    const IconComponent = Ionicons;
    return (
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            style={{ flex: 1 }}
            data={warningsData}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={this.toggleListItem}>
                <View style={styles.listItemContainer} >
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.warningType}</Text>
                  </View>

                  <View style={styles.dropButtonContainer}>
                    <View style={styles.dropButton}>
                      {this.state.isHidden && <IconComponent name="ios-arrow-dropdown-circle" size={25} color={'black'} />}
                      {!this.state.isHidden && <IconComponent name="ios-arrow-dropup-circle" size={25} color={'black'} />}
                    </View>
                  </View>


                  <View style={styles.symbolContainer}>
                    <IconComponent name={item.icon} size={35} color={'black'} />
                  </View>

                  <View style={styles.warningLoadingContainer}>
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
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item) => item.warningType}
            scrollEnabled
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 60,
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 1,
    top: 5, left: 0, right: 0, bottom: 0,
    position: 'absolute',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  dropButtonContainer: {
    top: 0, left: 0, right: 8, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignItems: 'flex-end',
  },
  symbolContainer: {
    top: 0, left: 8, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  flatListContainer: {
    flex: 1,
  },
  warningLoadingContainer: {
    top: 8,
    paddingHorizontal: 45,
    width: '90%',
    flexGrow: 1,
  },
  warningBarColorContainer: {
    flexDirection: 'row',
  },
  weekdayBarContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningBarContainer: {
    flex: 1,
    paddingHorizontal: 8,
    textAlign: 'center',

  },
  warningDayText: {
    flexDirection: 'row',
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
