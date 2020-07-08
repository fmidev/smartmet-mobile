import {
  View, Text, StyleSheet, TouchableWithoutFeedback, Image,
} from 'react-native';
import { translate } from 'react-i18next';
import moment from 'moment-with-locales-es6';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { warningsFetch } from '../actions/WarningsActions';
import Images from '../assets/images';


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
    top: 5,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  dropButtonContainer: {
    top: 0,
    left: 0,
    right: 8,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignItems: 'flex-end',
  },
  symbolContainer: {
    top: 0,
    left: 8,
    right: 0,
    bottom: 0,
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
  collapsableContentContainer: {
    backgroundColor: 'rgb(222,236,246)',
  },
  collapsableContentText: {
    paddingVertical: 18,
    paddingHorizontal: 7,
    color: 'black',
    fontSize: 16,
  },
  collapsableContentArea: {
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 7,
    color: 'black',
    fontSize: 14,
  },
  collapsableContentTime: {
    fontStyle: 'italic',
    paddingHorizontal: 7,
    color: 'black',
    fontSize: 14,
  },
  collapsableContentSender: {
    fontStyle: 'italic',
    paddingHorizontal: 7,
    color: 'black',
    fontSize: 14,
    paddingBottom: 7,
  },
});


export class WarningsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHidden: true };
  }

  toggleListItem = () => {
    console.log('toggleListItem');
    this.setState({ isHidden: !this.state.isHidden });
  }

  render() {
    const { t } = this.props;
    // console.log('ITEM', this.props.item.item);
    const IconComponent = Ionicons;
    return (
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <TouchableWithoutFeedback onPress={this.toggleListItem}>
            <View style={styles.listItemContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{this.props.item.item.event}</Text>
              </View>

              <View style={styles.dropButtonContainer}>
                <View style={styles.dropButton}>
                  {this.state.isHidden && <IconComponent name="ios-arrow-dropdown-circle" size={25} color="black" />}
                  {!this.state.isHidden && <IconComponent name="ios-arrow-dropup-circle" size={25} color="black" />}
                </View>
              </View>


              <View style={styles.symbolContainer}>
                {this.props.item.item.warningName === 'unidentified'
                  ? <Image style={{ width: 40, height: 40 }} source={Images.warnings['na']} />
                  : <Image style={{ width: 40, height: 40 }} source={Images.warnings[this.props.item.item.warningName]} />}
              </View>

              <View style={styles.warningLoadingContainer}>
                <View style={styles.weekdayBarContainer}>

                  {
                    this.props.item.item.styling.map((element, i) => (
                      <View key={i} style={styles.warningBarContainer}>
                        <Text style={styles.warningDayText}>{moment(element.time).format('ddd').toUpperCase()}</Text>
                        <View style={styles.warningBarColorContainer}>
                          {
                            element.bars.map((barElement, k) => (
                              <View key={k} style={{ width: barElement.width, height: 4, backgroundColor: barElement.color }} />
                            ))
                          }
                        </View>
                      </View>
                    ))
                  }
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {!this.state.isHidden && (
            <View style={styles.collapsableContentContainer}>
              <Text style={styles.collapsableContentArea}>
                {this.props.item.item.event}
                {' '}
                <Text>for </Text>
                {' '}
                {this.props.item.item.area}
              </Text>
              <Text style={styles.collapsableContentTime}>
                <Text>{`${t('warnings:valid from')}`} </Text>
                {moment(this.props.item.item.effective).format('LLLL')}
              </Text>
              <Text style={styles.collapsableContentTime}>
                <Text>{`${t('warnings:to')}`} </Text>
                {moment(this.props.item.item.expires).format('LLLL')}
              </Text>
              <Text style={styles.collapsableContentText}>{this.props.item.item.description}</Text>

              <Text style={styles.collapsableContentSender}>
                <Text>{`${t('warnings:issued by')}`} </Text>
                {this.props.item.item.senderName}
                {' '}
                <Text>{`${t('warnings:at')}`} </Text>
                {moment(this.props.item.item.onset).format('LLLL')}
              </Text>

            </View>
          )}
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  const { warningsLoading, warningsObjArr } = state.warningsObjArr;
  return { warningsLoading, warningsObjArr };
};


export default connect(mapStateToProps, { warningsFetch })(translate(['warnings'], { wait: true })(WarningsListItem));
