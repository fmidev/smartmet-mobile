import React from 'react';
import {
  View, Platform, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, TouchableWithoutFeedback,
} from 'react-native';
import i18n from 'i18next';
import { connect } from 'react-redux';
import { ErrorView } from '../components';
import { autocompleteInit, autocompleteFetch } from '../actions/AutocompleteActions';
import { tsFetchUpdate } from '../actions/TimeSeriesActions';
import { warningsFetch } from '../actions/WarningsActions';
import { setPlace } from '../actions/QueryParamActions';
import ArrowLeft from '../components/ArrowLeft';
import SearchInputLightMode from '../assets/images/icons/searchInputLightMode.svg';
import CloseBlueLightMode from '../assets/images/icons/closeBlueLightMode.svg';
import ArrowRightLightMode from '../assets/images/icons/arrowRightLightMode.svg';

console.log('Platform.OS', Platform.OS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(238,244,251)',
    height: 40,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  searchIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  clearButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(238,244,251)',
    color: '#424242',
    borderRadius: 8,
  },
  arrowRightEnd: {
    flex: 1,
    paddingRight: 20,
    alignItems: 'flex-end',
  },
  horizontalLine: {
    borderBottomColor: 'rgb(216,231,242)',
    borderBottomWidth: 1,
    paddingBottom: 17,
  },
  autocompleteContainer: {
    paddingTop: 1,
  },
  resultItem: {
    paddingVertical: 8,
    paddingLeft: 18,
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 0,
  },
  resultItemText: {
    color: 'rgb(48,49,147)',
    fontSize: 15,
    fontFamily: 'Roboto-Regular'
  },
});

export class SearchScreen extends React.Component {

  componentDidMount() {
    this.props.autocompleteInit();
    this.props.navigation.setParams({
      handleKeyPress: this._callAutocomplete,
      props: this.props,
    });
  }

  renderError() {
    return (
      <ErrorView />
    );
  }

  _callAutocomplete(pressedKey) {
    this.props.autocompleteFetch(pressedKey, i18n.language);
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('search:search'),
    headerLeft: (<TouchableOpacity onPress={() => navigation.goBack(null)} style={{ paddingLeft: 10, }}><ArrowLeft /></TouchableOpacity>)
  });

  navigatePreviousScreen = (coords) => {
    this.props.setPlace(coords)
    this.props.tsFetchUpdate().then(() => this.props.warningsFetch());
    this.props.navigation.goBack();
  }

  renderSeparator = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(216,231,242)',
        height: 1,
        marginHorizontal: 20,
      }}
    />
  );

  render() {

    if (this.props.error) {
      return this.renderError();
    }

    const { params = {} } = this.props.navigation.state;

    return (

      <View style={styles.container}>

        <View style={styles.searchContainer}>
          <SearchInputLightMode style={styles.searchIcon}></SearchInputLightMode>
          <TextInput
            style={styles.input}
            placeholder="Search"
            autoFocus={true}
            onKeyPress={(e) => params.handleKeyPress(e.nativeEvent.key)}
            underlineColorAndroid="transparent"
            ref={input => { this.textInput = input }}
          />
          <TouchableOpacity onPress={() => { this.props.autocompleteInit(); this.textInput.clear() }}>
            <CloseBlueLightMode style={styles.clearButton} ></CloseBlueLightMode>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine}></View>

        <View style={styles.autocompleteContainer}>
          <FlatList
            keyboardShouldPersistTaps={'handled'}
            data={this.props.acDataObj}
            renderItem={({ item }) =>
              <TouchableWithoutFeedback onPress={() => { this.navigatePreviousScreen({ lat: item.lat, lon: item.lon }) }}>
                <View style={styles.resultItem} >
                  <Text style={styles.resultItemText} >{item.name}</Text>
                  <View style={styles.arrowRightEnd}><ArrowRightLightMode width={25} /></View>
                </View>
              </TouchableWithoutFeedback>
            }
            keyExtractor={item => item.name}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>

      </View >

    );
  }
}

const mapStateToProps = (state) => {
  //console.log('STATE', state)
  const { loading, error, pattern, acDataObj } = state.acDataObj;
  return { loading, error, pattern, acDataObj };
};

export default connect(mapStateToProps, { autocompleteInit, autocompleteFetch, tsFetchUpdate, warningsFetch, setPlace })(SearchScreen);
