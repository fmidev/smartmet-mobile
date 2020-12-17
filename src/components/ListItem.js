import React from 'react';
import i18n from 'i18next';
import { translate } from 'react-i18next';
import {
  View, Text, StyleSheet, Image, TouchableWithoutFeedback, FlatList,
} from 'react-native';
import moment from 'moment';
import momentLocales from 'moment-with-locales-es6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../assets/images';
import { converter, getWindDirectionArrow } from '../components/Helper'
import WindDirBg from '../assets/images/icons/windDirectionBgLightMode.svg';

const styles = StyleSheet.create({
  listItemContainer: {
    paddingHorizontal: 15,
  },
  listItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderBottomColor: 'rgb(216,231,242)',
    borderBottomWidth: 0.9,
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
  },
  listHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 18,
  },
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
    const itemDay = momentLocales(this.props.item.item.time).format('YYYYMMDD')

    this.props.tsDataObj.data.forEach(element => {

      if (momentLocales(element.utctime).isSameOrAfter(this.props.nextHourDivisibleByThreeFromServerTime.format('YYYYMMDDTHHmm'), 'hour') && (element.time).includes(itemDay)) {
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
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{momentLocales(item.time).format('HH:mm')}</Text>
        </View>

        <Image
          source={Images.symbols[item.smartsymbol]}
          style={{ height: 50, width: 50, marginTop: 6 }}
        />

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 15 }}>
          <Text style={{ color: 'black' }}>{item.temperature}°</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 15 }}>
          <Image
            source={require('../assets/images/feels-the-same.png')}
            style={{ height: 50, width: 50, marginTop: 6 }}
          />
          <Text style={{ color: 'black' }}>{item.feelslike}°</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 15 }}>
          <Text style={{ color: 'black', fontSize: 30, textAlign: 'right', marginBottom: 6 }}>{getWindDirectionArrow(item.winddirection)}</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'black' }}>
            {item.windspeedms}
            {' '}
            {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['wind'])}`}
          </Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'black' }}>{item.humidity} %</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
          <Text style={{ color: 'black' }}>{item.precipitation1h} {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['precipitation'])}`} </Text>
        </View>

      </View>
    )

  }

  render() {
    const { t } = this.props;
    const IconComponent = Ionicons;
    momentLocales.locale(i18n.language)
    return (
      <View style={styles.listItemContainer} >
        <TouchableWithoutFeedback onPress={this.toggleListItem}>
          <View style={styles.listItem} >
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Roboto-Bold', color: 'rgb(48,49,147)', fontSize: 14 }}>
                {`${t('weekday abbreviations:' + moment(this.props.item.item.time).format('dddd').toLowerCase())}`}
              </Text>
              <Text style={{ fontFamily: 'Roboto-Regular', color: 'rgb(48,49,147)', fontSize: 14 }}>
                {momentLocales(this.props.item.item.time).format('DD')}
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingLeft: 6, paddingRight: 2 }}>
              <Image style={{ alignItems: 'center', flex: 1 }}
                source={Images.symbols[this.props.item.item.smartsymbol]}
                style={{ height: 50, width: 50, marginTop: 10 }}
              />
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingHorizontal: 8 }}>
              <Text style={{ fontFamily: 'Roboto-Bold', color: 'rgb(48,49,147)', fontSize: 14 }}>{converter(this.props.parameterUnitMap['temperature'], this.props.item.item.temperature).toFixed(this.props.parameterUnitPrecisionMap['temperature'])}°</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <WindDirBg
                style={{
                  transform: [{ rotate: this.props.item.item.winddirection.toString() + 'deg' }]
                }} width={30} height={30}
              />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Roboto-Bold', color: 'rgb(48,49,147)', fontSize: 14 }}>
                {converter(this.props.parameterUnitMap['wind'], this.props.item.item.windspeedms).toFixed(this.props.parameterUnitPrecisionMap['wind'])}
                {' '}
              </Text>
              <Text style={{ fontFamily: 'Roboto-Regular', color: 'rgb(48,49,147)', fontSize: 14 }}>
                {`${t('unit abbreviations:' + this.props.parameterUnitAbbMap['wind'])}`}
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1, paddingLeft: 8 }}>
              <Text style={{ color: 'rgb(48,49,147)', fontSize: 14 }}>
                <Text style={{ fontFamily: 'Roboto-Bold' }}>
                  {this.props.item.item.humidity.toFixed(0)}
                </Text>
                <Text style={{ fontFamily: 'Roboto-Regular', color: 'rgb(48,49,147)', fontSize: 14 }}>
                  {' %'}
                </Text>
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              {this.state.isHidden && <IconComponent name="ios-arrow-dropdown-circle" size={26} color={'rgb(48,49,147)'} />}
              {!this.state.isHidden && <IconComponent name="ios-arrow-dropup-circle" size={26} color={'rgb(48,49,147)'} />}
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
