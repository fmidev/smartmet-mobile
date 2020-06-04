import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment-with-locales-es6';
import {
  View, StyleSheet, FlatList,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { LoadingView } from '../components';
import { ErrorView } from '../components';
import { warningsFetch } from '../actions/WarningsActions';
import WarningsListItem from '../components/WarningsListItem';

const warningsData = [
  {
    warningType: "Wind",
    icon: "ios-move",
    description: 'It is expected strong wind with mean speed between 15 m/s and 18 m/s with higher gusts in Kochkor district. BE AWARE of debris being blown around. Localised outdoor activity disruptions are possible due to debris and dust.',
  },
  {
    warningType: "Flood",
    icon: "ios-water",
    description: 'Ut ultrices libero imperdiet metus ornare, sit amet elementum felis sagittis. Maecenas in metus facilisis, ullamcorper tellus at, rutrum enim. Curabitur bibendum iaculis rutrum. Integer lacinia metus eget neque fermentum suscipit quis nec mi. Nulla facilisi. Aliquam nec sem dictum felis scelerisque lobortis vitae nec mi. In lectus arcu, ultrices ornare commodo id, maximus malesuada odio. Aliquam nec odio quis dolor eleifend condimentum. Pellentesque vitae fermentum nisi. Nam dignissim fermentum tortor. Ut sit amet purus a nunc egestas ullamcorper.',
  },
  {
    warningType: "Thunderstorm",
    icon: "ios-thunderstorm",
    description: 'Mauris nec risus dolor. Aliquam neque nisl, vehicula ac feugiat eget, condimentum quis ex. Etiam mattis velit volutpat feugiat ullamcorper. Etiam cursus pharetra elit, nec porta nunc cursus non. Vestibulum bibendum tempus nunc quis porta. Phasellus quis pellentesque velit. Nunc lacinia orci sed turpis sagittis ultrices. Nunc vitae diam nec massa tempor elementum quis viverra urna. Mauris at enim velit. Suspendisse non libero in erat pellentesque iaculis.',
  },
  {
    warningType: "Forest fire",
    icon: "md-bonfire",
    description: 'Aliquam hendrerit maximus sollicitudin. Fusce ullamcorper semper lacus, vitae lobortis nunc consectetur non. Etiam auctor quis quam id hendrerit. Nunc placerat finibus tellus, vitae condimentum felis pellentesque vitae. Donec pulvinar pharetra tellus, ac aliquam sem congue quis. Praesent faucibus condimentum eros, vitae laoreet ligula viverra at. Duis id lobortis metus. Nunc a pulvinar justo, non vehicula lorem. In dapibus justo eget erat ullamcorper sollicitudin.',
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  flatListContainer: {
    flex: 1,
    marginTop: 10,
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
            data={warningsData}
            renderItem={(item) => <WarningsListItem item={item} />}
            keyExtractor={(item) => item.warningType}
            scrollEnabled
            //onRefresh={() => this.onRefresh()}
            refreshing={this.props.loading}
          />
        </View>
      </View>
    );
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading();
    }
    if (this.props.error) {
      return this.renderError();
    }
    return this.renderFlatList();
  }
}

export default WarningsScreen;
