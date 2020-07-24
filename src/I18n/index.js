import Config from 'react-native-config';
import _ from 'lodash';
import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import { NativeModules } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import en from './en.json';
import ky from './ky.json';
import vi from './vi.json';

const resources = { en, ky, vi }
const STORAGE_KEY = '@APP:languageCode';

let systemLng =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

systemLng = systemLng.substr(0, systemLng.indexOf('_'));

if (!_.has(resources, systemLng)) {
  systemLng = null;
}

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const savedDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
    const lng = (savedDataJSON) || null;
    const selectLanguage = lng || systemLng || Config.DEFAULT_LANGUAGE || 'en';
    callback(selectLanguage);
  },
  cacheUserLanguage: () => { },
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    resources: resources,
    ns: ['common'],
    defaultNS: 'common',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
