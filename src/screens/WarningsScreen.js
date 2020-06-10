import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment-with-locales-es6';
import {
  View, StyleSheet, FlatList,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { LoadingView } from '../components';
import { ErrorView } from '../components';
import WarningsListItem from '../components/WarningsListItem';
import { warningsFetch } from '../actions/WarningsActions';

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
    console.log('refreshed')
    this.props.tsFetch();
    this.props.warningsFetch();
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
            keyExtractor={(item) => item.onset}
            scrollEnabled
            //onRefresh={() => this.onRefresh()}
            refreshing={this.props.loading}
          />
        </View>
      </View>
    );
  }

  render() {
    console.log('PROPS', this.props)
    if (this.props.loading) {
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

export default connect(mapStateToProps, { warningsFetch })(WarningsScreen);
