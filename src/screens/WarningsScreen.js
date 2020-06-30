import React from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, FlatList,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { LoadingView } from '../components';
import { ErrorView } from '../components';
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
      <ErrorView />
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
    if (this.props.error) {
      return this.renderError();
    }
    return this.renderFlatList();
  }
}


const mapStateToProps = (state) => ({
  warningsLoading: state.warningsObjArr.warningsLoading,
  warningsObjArr: state.warningsObjArr.warningsObjArr
});

export default withNavigation(connect(mapStateToProps, { tsFetch, warningsFetch })(WarningsScreen));
