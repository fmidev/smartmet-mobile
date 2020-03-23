import React from 'react';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    height: 60,
  },
  search: {
    paddingTop: 7,
    paddingLeft: 10,
    paddingBottom: 7,
    textTransform: 'uppercase',
    backgroundColor: '#F7F7F7',
  },
  textInput: {
    backgroundColor: '#E6E8E9',
    borderRadius: 2,
    color: '#8E8E93',
    flexDirection: 'row',
    width: 280,
  },
});

export class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: () => (
      <View style={styles.header}>
        <HeaderBackButton style={styles.headerBackButton} onPress={() => navigation.goBack(null)} />
        <TextInput style={styles.textInput} />
      </View>
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.search}>
          SEARCH
        </Text>

      </View>
    );
  }
}

export default SearchScreen;
