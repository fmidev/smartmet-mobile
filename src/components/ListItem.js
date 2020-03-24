import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableWithoutFeedback,
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
        {!this.state.isHidden && <Text >TODO: Daily details</Text>}
      </View>
    );
  }
}
