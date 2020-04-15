import React from 'react';
import { translate } from 'react-i18next';
import {
  View, Text, StyleSheet, Image, TouchableWithoutFeedback, FlatList,
} from 'react-native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../assets/images';
import { converter } from '../components/Helper'

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: 'lightgray',
  },
  listItem: {
    margin: 0.5,
    paddingBottom: 7,
    backgroundColor: '#FFF',
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 0,
  },
  collapsableContent: {
    // backgroundColor: 'azure',
    backgroundColor: 'rgb(222,236,246)',
    marginRight: 1,
    paddingBottom: 15,
  }
});

export class ListItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isHidden: true }
  }

  toggleListItem = () => {
    this.setState({ isHidden: !this.state.isHidden })
  }

  getCollapsableContentData = () => {
    const collapsableContentArr = []
    const itemDay = moment(this.props.item.item.time).format('YYYYMMDD')

    this.props.tsDataObj.data.forEach(element => {

      if ((element.time).includes(itemDay)) {
        const collapsableItemObj = {}
        collapsableItemObj.time = element.time
        collapsableItemObj.smartsymbol = element.smartsymbol
        collapsableItemObj.temperature = converter(this.props.parameterUnitMap['temperature'], element.temperature).toFixed(this.props.parameterUnitPrecisionMap['temperature'])
        collapsableItemObj.feelslike = converter(this.props.parameterUnitMap['temperature'], element.feelslike).toFixed(this.props.parameterUnitPrecisionMap['temperature'])
        collapsableItemObj.windspeedms = converter(this.props.parameterUnitMap['wind'], element.windspeedms).toFixed(this.props.parameterUnitPrecisionMap['wind'])
        collapsableItemObj.winddirection = element.winddirection
        collapsableItemObj.humidity = element.humidity.toFixed(0)
        collapsableItemObj.precipitation1h = converter(this.props.parameterUnitMap['precipitation'], element.precipitation1h).toFixed(this.props.parameterUnitPrecisionMap['precipitation'])
        collapsableContentArr.push(collapsableItemObj);
      }
    });
    return collapsableContentArr
  }

  renderCollapsableContent = (item) => {
    const { t } = this.props;
    // console.log('renderCollapsableContent') // TODO: Check is this normal behaviour 

    return (
      <View style={styles.collapsableContent} >
        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{moment(item.time).format('HH:mm')}</Text>
        </View>

        <Image
          source={Images.symbols[item.smartsymbol]}
          style={{ height: 50, width: 50, marginTop: 6 }}
        />

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'black' }}>{item.temperature}</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Image
            source={require('../assets/images/feels-the-same.png')}
            style={{ height: 50, width: 50, marginTop: 6 }}
          />
          <Text style={{ color: 'black' }}>{item.feelslike}</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'green' }}>
            {item.windspeedms}
            {' '}
            {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['wind'])}`}
          </Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'darkslategrey' }}>{item.humidity}</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'darkslategrey' }}>{item.precipitation1h}</Text>
        </View>

      </View>
    )

  }

  render() {
    const { t } = this.props;
    const IconComponent = Ionicons;
    return (
      <View style={styles.listItemContainer} >
        <TouchableWithoutFeedback onPress={this.toggleListItem}>
          <View style={styles.listItem} >
            <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>{`${t('weekday abbreviations:' + moment(this.props.item.item.time).format('ddd').toLowerCase())}`}</Text>
              <Text style={{ fontWeight: 'bold' }}>{moment(this.props.item.item.time).format('DD')}</Text>
            </View>

            <Image
              source={Images.symbols[this.props.item.item.smartsymbol]}
              style={{ height: 50, width: 50, marginTop: 6 }}
            />

            <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>{converter(this.props.parameterUnitMap['temperature'], this.props.item.item.temperature).toFixed(this.props.parameterUnitPrecisionMap['temperature'])}</Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
              <Text style={{ color: 'green' }}>
                {converter(this.props.parameterUnitMap['wind'], this.props.item.item.windspeedms).toFixed(this.props.parameterUnitPrecisionMap['wind'])}
                {' '}
                {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['wind'])}`}
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
              <Text style={{ color: 'darkslategrey' }}>{this.props.item.item.humidity.toFixed(0)}</Text>
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

export default translate(['weekday abbreviations', 'unit abbreviations'], { wait: true })(ListItem);
