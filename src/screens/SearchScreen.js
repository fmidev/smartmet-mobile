import React from 'react';
import {
  View, Text, StyleSheet, TextInput, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation-stack';
import { autocompleteInit, autocompleteFetch } from '../actions/AutocompleteActions';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    height: 60,
  },
  textInput: {
    backgroundColor: '#E6E8E9',
    borderRadius: 2,
    color: 'black',
    fontSize: 16,
    flexDirection: 'row',
    width: 332,
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

function ResultsSection({ item }) {
  return (
    <View style={styles.resultItem} >
      <Text style={styles.resultItemText} >{item.name}</Text>
    </View>
  )
}

export class SearchScreen extends React.Component {

  componentDidMount() {
    this.props.autocompleteInit();
    this.props.navigation.setParams({
      handleKeyPress: this._callAutocomplete,
      props: this.props,
    });
  }

  _callAutocomplete(pressedKey) {
    console.log('_callAutocomplete')
    this.props.autocompleteFetch(pressedKey);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: () => (
        <View style={styles.header}>
          <HeaderBackButton style={styles.headerBackButton} onPress={() => navigation.goBack(null)} />
          <TextInput style={styles.textInput} onKeyPress={(e) => params.handleKeyPress(e.nativeEvent.key)} />
        </View>
      ),
    }
  };

  render() {
    return (
      <View style={styles.autocompleteContainer}>

        <FlatList
          data={this.props.acDataObj}
          renderItem={({ item }) => <ResultsSection item={item} />}
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

export default connect(mapStateToProps, { autocompleteInit, autocompleteFetch })(SearchScreen);
