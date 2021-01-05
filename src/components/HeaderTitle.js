import { Text } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

export class HeaderTitle extends React.Component {
  render() {
    return (
      <Text>{this.props.tsDataObj.placeName}</Text>
    );
  }
}

const mapStateToProps = (state) => {
  const { tsDataObj } = state.tsDataObj;
  return { tsDataObj };
};

export default connect(mapStateToProps, {})(HeaderTitle);
