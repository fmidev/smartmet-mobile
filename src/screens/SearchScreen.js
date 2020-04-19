import React from 'react';
import {
  View, Platform, Text, StyleSheet, TextInput, FlatList, TouchableWithoutFeedback,
} from 'react-native';
import i18n from 'i18next';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation-stack';
import { autocompleteInit, autocompleteFetch } from '../actions/AutocompleteActions';
import { tsFetchUpdate } from '../actions/TimeSeriesActions';
import { setPlace } from '../actions/QueryParamActions';
console.log('Platform.OS', Platform.OS)
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 45 : 10,
    height: Platform.OS === 'ios' ? 'auto' : 60,
    paddingBottom: 10,
    paddingRight: 30,
  },
  textInput: {
    backgroundColor: '#E6E8E9',
    borderRadius: 2,
    color: 'black',
    marginLeft: Platform.OS === 'ios' ? 12 : 2,
    fontSize: 16,
    flexDirection: 'row',
    width: Platform.OS === 'ios' ? 325 : 332,
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

  _callAutocomplete(pressedKey) {
    this.props.autocompleteFetch(pressedKey, i18n.language);
  }

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

  navigateHomeWithCoords = (coords) => {
    this.props.setPlace(coords)
    this.props.navigation.navigate('Home');
    this.props.tsFetchUpdate();
  }

  render() {
    return (
      <View style={styles.autocompleteContainer}>

        <FlatList
          keyboardShouldPersistTaps={'handled'}
          data={this.props.acDataObj}
          renderItem={({ item }) =>
            <TouchableWithoutFeedback onPress={() => { this.navigateHomeWithCoords({ lat: item.lat, lon: item.lon }) }}>
              <View style={styles.resultItem} >
                <Text style={styles.resultItemText} >{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          }
          keyExtractor={item => item.name}
        />

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log('STATE', state)
  const { loading, pattern, acDataObj } = state.acDataObj;
  return { loading, pattern, acDataObj };
};

export default connect(mapStateToProps, { autocompleteInit, autocompleteFetch, tsFetchUpdate, setPlace })(SearchScreen);
