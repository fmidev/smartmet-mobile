import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings(['ReactNativeFiberHostComponent']);
console.disableYellowBox = true;
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { translate } from 'react-i18next';
import reducers from './src/reducers';
import { SafeAreaView } from 'react-navigation';
import i18n from './src/I18n/index';
import Stack from './src/navigators/stack-navigator';

const WrappedStack = ({ t }) => <Stack screenProps={{ t }} />;
const ReloadAppOnLanguageChange = translate('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(WrappedStack);


export default class App extends React.Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <ReloadAppOnLanguageChange />
        </Provider>
      </SafeAreaView>
    );
  }
}
