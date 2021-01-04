import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import { translate } from 'react-i18next';

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },

});

export class SymbolsScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('weather symbols:weather symbols'),
    headerLeft: () => <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
  });

  render() {
    const { t } = this.props;
    return (
      <Text>{`${t('weather symbols:weather symbols')} `}</Text>
    );
  }
}

export default translate(['weather symbols'], { wait: true })(SymbolsScreen);
