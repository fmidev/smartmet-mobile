import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';


const styles = StyleSheet.create({
  container: {
    color: 'black',
  },

});

export class AboutScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('settings:settings'),
    headerLeft: () => <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
  });

  render() {
    return (
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut iaculis nunc, sit amet egestas lectus. Vivamus interdum congue libero, ac sodales lorem mattis id. Cras placerat erat eget odio feugiat cursus. Pellentesque rutrum sagittis massa non pharetra. Nam imperdiet eleifend purus, quis interdum urna porta vel. Praesent dignissim ultricies ultrices. Nunc at elit egestas, ullamcorper nibh at, venenatis est. Donec lobortis consequat lorem sit amet pharetra. Phasellus dignissim leo non accumsan mattis. Nulla dapibus nec dui sed malesuada. Fusce mattis lacinia pulvinar. Proin nec bibendum risus. Nulla mattis posuere tortor, at vestibulum erat maximus eget.{'\n'}{'\n'}

        Nam quis fringilla justo. Aenean in sem dapibus, ultrices purus vel, sodales est. Cras sit amet egestas metus, sit amet tempus est. Proin non magna pretium, malesuada quam nec, vulputate lacus. Praesent pellentesque urna diam, dictum fringilla est suscipit sed. Quisque viverra fringilla magna ut consectetur. Praesent tempus erat quis mattis elementum. Sed vitae condimentum augue, sed commodo ante.
      </Text>
    );
  }
}

export default AboutScreen;
