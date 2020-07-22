import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import i18n from 'i18next';
import _ from 'lodash';
import {
  View, StyleSheet, FlatList,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { LoadingView, ErrorView, WarningsErrorView, WarningsNotSetView } from '../components';
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
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            style={{ flex: 1 }}
            ListEmptyComponent={<ErrorView t={t} />}
            onRefresh={() => this.onRefresh()}
            refreshing={this.props.warningsLoading}
          />
        </View>
      </View>
    );
  }

  renderWarningsError() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            style={{ flex: 1 }}
            ListEmptyComponent={<WarningsErrorView t={t} />}
            onRefresh={() => this.onRefresh()}
            refreshing={this.props.warningsLoading}
          />
        </View>
      </View>
    );
  }

  onRefresh() {
    this.props.warningsFetch();
  }

  refreshLocation() {
    this.props.tsFetch().then(() => {
      if (!this.props.error) {
        this.props.warningsFetch()
      }
    });
  }

  renderFlatList() {
    const { t } = this.props;
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.refreshLocation) {
        this.refreshLocation();
        this.props.navigation.state.params.refreshLocation = false;
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            style={{ flex: 1 }}
            data={this.props.warningsObj[i18n.language] || this.props.warningsObj.en || this.props.warningsObj[Object.keys(this.props.warningsObj)[0]]}
            renderItem={(item) => <WarningsListItem item={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled
            onRefresh={() => this.onRefresh()}
            refreshing={this.props.warningsLoading}
            ListEmptyComponent={<WarningsNotSetView t={t} />}
          />
        </View>
      </View>
    );
  }

  render() {
    if (this.props.loading || this.props.warningsLoading) {
      return this.renderLoading();
    }
    if (this.props.error) {
      return this.renderError();
    }
    if (this.props.warningsError) {
      return this.renderWarningsError();
    }
    return this.renderFlatList();
  }
}


const mapStateToProps = (state) => ({
  loading: state.tsDataObj.loading,
  error: state.tsDataObj.error,
  warningsLoading: state.warningsObj.warningsLoading,
  warningsError: state.warningsObj.warningsError,
  warningsObj: state.warningsObj.warningsObj,
});

export default withNavigation(connect(mapStateToProps, { tsFetch, warningsFetch })(translate(['warnings'], { wait: true })(WarningsScreen)));
