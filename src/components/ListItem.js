import React from 'react';
import i18n from 'i18next';
import { translate } from 'react-i18next';
import {
  View, Text, StyleSheet, Image, TouchableWithoutFeedback, FlatList,
} from 'react-native';
import moment from 'moment-with-locales-es6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../assets/images';
import { converter, getWindDirectionArrow } from '../components/Helper'

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: 'lightgray',
  },
  listItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    margin: 0.5,
    backgroundColor: '#FFF',
    width: '100%',
    flexDirection: 'row',
  },
  collapsableContent: {
    backgroundColor: 'rgb(222,236,246)',
    marginRight: 1,
    paddingLeft: 4,
    paddingRight: 4,
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

      if (moment(element.utctime).isSameOrAfter(this.props.nextHourDivisibleByThreeFromServerTime.format('YYYYMMDDTHHmm'), 'hour') && (element.time).includes(itemDay)) {
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
          <Text style={{ color: 'black' }}>{item.temperature}°</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Image
            source={require('../assets/images/feels-the-same.png')}
            style={{ height: 50, width: 50, marginTop: 6 }}
          />
          <Text style={{ color: 'black' }}>{item.feelslike}°</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'green', fontSize: 30, textAlign: 'right', marginBottom: 6 }}>{getWindDirectionArrow(item.winddirection)}</Text>
          <Text style={{ color: 'green' }}>
            {item.windspeedms}
            {' '}
            {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['wind'])}`}
          </Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'darkslategrey' }}>{item.humidity} %</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'darkslategrey' }}>{item.precipitation1h} {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['precipitation'])}`} </Text>
        </View>

      </View>
    )

  }

  render() {
    const { t } = this.props;
    const IconComponent = Ionicons;
    moment.locale(i18n.language)
    return (
      <View style={styles.listItemContainer} >
        <TouchableWithoutFeedback onPress={this.toggleListItem}>
          <View style={styles.listItem} >
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>{moment(this.props.item.item.time).format('ddd').toUpperCase()}</Text>
              <Text style={{ fontWeight: 'bold' }}>{moment(this.props.item.item.time).format('DD')}</Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingBottom: 10, paddingLeft: 10, paddingRight: 6 }}>
              <Image style={{ alignItems: 'center', flex: 1 }}
                source={Images.symbols[this.props.item.item.smartsymbol]}
                style={{ height: 50, width: 50, marginTop: 10 }}
              />
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingHorizontal: 8 }}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>{converter(this.props.parameterUnitMap['temperature'], this.props.item.item.temperature).toFixed(this.props.parameterUnitPrecisionMap['temperature'])}°</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'green', fontSize: 30, marginBottom: 6, paddingLeft: 5 }}>{getWindDirectionArrow(this.props.item.item.winddirection)}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'green' }}>
                {converter(this.props.parameterUnitMap['wind'], this.props.item.item.windspeedms).toFixed(this.props.parameterUnitPrecisionMap['wind'])}
                {' '}
                {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['wind'])}`}
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingHorizontal: 10 }}>
              <Text style={{ color: 'darkslategrey' }}>{this.props.item.item.humidity.toFixed(0)}  %</Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              {this.state.isHidden && <IconComponent name="ios-arrow-dropdown-circle" size={25} color={'black'} />}
              {!this.state.isHidden && <IconComponent name="ios-arrow-dropup-circle" size={25} color={'black'} />}
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
