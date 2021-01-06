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

console.log('Platform.OS', Platform.OS)
const styles = StyleSheet.create({
  /*
  textInput: {
    backgroundColor: '#E6E8E9',
    borderRadius: 2,
    color: 'black',
    marginLeft: Platform.OS === 'ios' ? 12 : 2,
    fontSize: 16,
    flexDirection: 'row',
    marginRight: 40,
    width: Platform.OS === 'ios' ? '83%' : '90%',
  },
  */
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
  autocompleteContainer: {
    paddingTop: 1,
  },
  resultItem: {
    margin: 1,
    paddingTop: 15,
    paddingLeft: 18,
    paddingBottom: 15,
    backgroundColor: '#FFF',
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 0,
  },
  resultItemText: {
    color: 'black',
    fontSize: 16,
  }
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

  /*
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: () => (
        <View style={styles.header}>
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
          <TextInput style={styles.textInput} autoFocus={true} onKeyPress={(e) => params.handleKeyPress(e.nativeEvent.key)} />
        </View>
      ),
    }
  };
  */

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('search:search'),
    headerLeft: (<TouchableOpacity onPress={() => navigation.goBack(null)} style={{ paddingLeft: 10, }}><ArrowLeft /></TouchableOpacity>)
  });

  navigatePreviousScreen = (coords) => {
    this.props.setPlace(coords)
    this.props.tsFetchUpdate().then(() => this.props.warningsFetch());
    this.props.navigation.goBack();
  }

  render() {

    if (this.props.error) {
      return this.renderError();
    }

    return (

      <View style={styles.container}>

        <View style={styles.searchContainer}>
          <SearchInputLightMode style={styles.searchIcon}></SearchInputLightMode>
          <TextInput
            style={styles.input}
            placeholder="SEARCH"
            autoFocus={true}
            onKeyPress={(e) => params.handleKeyPress(e.nativeEvent.key)}
            underlineColorAndroid="transparent"
          />
          <CloseBlueLightMode style={styles.clearButton}></CloseBlueLightMode>
        </View>


        <View style={styles.autocompleteContainer}>

          <FlatList
            keyboardShouldPersistTaps={'handled'}
            data={this.props.acDataObj}
            renderItem={({ item }) =>
              <TouchableWithoutFeedback onPress={() => { this.navigatePreviousScreen({ lat: item.lat, lon: item.lon }) }}>
                <View style={styles.resultItem} >
                  <Text style={styles.resultItemText} >{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            }
            keyExtractor={item => item.name}
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
