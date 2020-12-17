import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  location: {
    fontSize: 15,
    color: 'rgb(48,49,147)',
    alignSelf: 'center',
    fontFamily: 'Roboto-Medium',
  },
});

export class HeaderTitle extends React.Component {
  render() {
    return (
      <Text style={styles.location}>{this.props.tsDataObj.placeName}</Text>
    );
  }
}

const mapStateToProps = (state) => {
  const { tsDataObj } = state.tsDataObj;
  return { tsDataObj };
};

export default connect(mapStateToProps, {})(HeaderTitle);
