import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableWithoutFeedback, FlatList,
} from 'react-native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../assets/images';

const styles = StyleSheet.create({
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
});

export default class ListItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isHidden: true }
  }

  toggleListItem = () => {
    this.setState({ isHidden: !this.state.isHidden })
  }

  getCollapsableContentData = () => {
    console.log('getCollapsableContentData')
    const collapsableContentArr = []
    const itemDay = moment(this.props.item.item.time).format('YYYYMMDD')

    this.props.tsDataObj.data.forEach(element => {

      if ((element.time).includes(itemDay)) {
        const collapsableItemObj = {}
        collapsableItemObj.time = element.time
        collapsableItemObj.smartsymbol = element.smartsymbol
        collapsableItemObj.temperature = element.temperature
        collapsableItemObj.feelslike = element.feelslike
        collapsableItemObj.windspeedms = element.windspeedms
        collapsableItemObj.winddirection = element.winddirection
        collapsableItemObj.humidity = element.humidity
        collapsableItemObj.precipitation1h = element.precipitation1h
        collapsableContentArr.push(collapsableItemObj);
      }
    });
    // console.log('collapsableContentArr', collapsableContentArr)
    return collapsableContentArr
  }

  renderCollapsableContent = (item) => {
    // console.log('renderCollapsableContent') // TODO: Check is this normal behaviour 

    return (
      <View>
        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{moment(item.time).format('HH:mm')}</Text>
        </View>

        <Image
          source={Images.symbols[item.smartsymbol]}
          style={{ height: 50, width: 50, marginTop: 6 }}
        />

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'red' }}>{item.temperature}</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'red' }}>{item.feelslike}</Text>
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

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text>{item.precipitation1h}</Text>
        </View>

      </View>
    )

  }

  render() {
    const IconComponent = Ionicons;
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.toggleListItem}>
          <View style={styles.listItem} >
            <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>{moment(this.props.item.item.time).format('ddd').toUpperCase()}</Text>
              <Text style={{ fontWeight: 'bold' }}>{moment(this.props.item.item.time).format('DD')}</Text>
            </View>

            <Image
              source={Images.symbols[this.props.item.item.smartsymbol]}
              style={{ height: 50, width: 50, marginTop: 6 }}
            />

            <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
              <Text style={{ color: 'red' }}>{this.props.item.item.temperature}</Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
              <Text style={{ color: 'green' }}>
                {this.props.item.item.windspeedms}
                {' '}
                m/s
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
              <Text>{this.props.item.item.humidity}</Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
              {this.state.isHidden && <IconComponent name="ios-arrow-dropdown-circle" size={25} />}
              {!this.state.isHidden && <IconComponent name="ios-arrow-dropup-circle" size={25} />}
            </View>

          </View>
        </TouchableWithoutFeedback>
        {!this.state.isHidden && <View>
          <FlatList
            data={this.getCollapsableContentData()}
            renderItem={({ item }) => this.renderCollapsableContent(item)}
            keyExtractor={(item) => item.time}
            horizontal={true}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>}
      </View>
    );
  }
}
