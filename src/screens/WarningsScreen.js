import React from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, FlatList,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { LoadingView, WarningsErrorView, WarningsNotSetView } from '../components';
import WarningsListItem from '../components/WarningsListItem';
import { warningsFetch } from '../actions/WarningsActions';
import { tsFetch } from '../actions/TimeSeriesActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  flatListContainer: {
    flex: 1,
  },
});

export class WarningsScreen extends React.Component {

  renderLoading() {
    return (
      <LoadingView />
    );
  }

  renderError() {
    return (
      <WarningsErrorView />
    );
  }

  renderWarningsNotSet() {
    return (
      <WarningsNotSetView />
    );
  }

  getListData() {
    const listData = [];

    return listData;
  }

  onRefresh() {
    this.props.tsFetch().then(() => this.props.warningsFetch());
  }

  renderFlatList() {

    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.refreshLocation) {
        this.onRefresh()
        this.props.navigation.state.params.refreshLocation = false
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            style={{ flex: 1 }}
            data={this.props.warningsObjArr}
            renderItem={(item) => <WarningsListItem item={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled
            onRefresh={() => this.onRefresh()}
            refreshing={this.props.warningsLoading}
          />
        </View>
      </View>
    );
  }

  render() {
    if (this.props.warningsLoading) {
      return this.renderLoading();
    }
    if (this.props.warningsError) {
      return this.renderError();
    }
    if (this.props.warningsObjArr.length < 1 && !this.props.warningsError) {
      return this.renderWarningsNotSet();
    }
    return this.renderFlatList();
  }
}


const mapStateToProps = (state) => ({
  warningsLoading: state.warningsObjArr.warningsLoading,
  warningsError: state.warningsObjArr.warningsError,
  warningsObjArr: state.warningsObjArr.warningsObjArr
});

export default withNavigation(connect(mapStateToProps, { tsFetch, warningsFetch })(WarningsScreen));
