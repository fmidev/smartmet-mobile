import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import i18n from 'i18next';
import _ from 'lodash';
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
    const { t } = this.props;
    return (
      <WarningsErrorView t={t} />
    );
  }

  renderWarningsNotSet() {
    const { t } = this.props;
    return (
      <WarningsNotSetView t={t} />
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
        this.onRefresh();
        this.props.navigation.state.params.refreshLocation = false;
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            style={{ flex: 1 }}
            data={this.props.warningsObj[i18n.language] || this.props.warningsObj.en || this.props.warningsObj[Object.keys(this.props.warningsOb)[0]]}
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
    if (_.isPlainObject(this.props.warningsObj) && _.isEmpty(this.props.warningsObj) && !this.props.warningsError) {
      return this.renderWarningsNotSet();
    }
    return this.renderFlatList();
  }
}


const mapStateToProps = (state) => ({
  warningsLoading: state.warningsObj.warningsLoading,
  warningsError: state.warningsObj.warningsError,
  warningsObj: state.warningsObj.warningsObj,
});

export default withNavigation(connect(mapStateToProps, { tsFetch, warningsFetch })(translate(['warnings'], { wait: true })(WarningsScreen)));
