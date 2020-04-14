import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import locale from 'react-native-locale-detector';
import AsyncStorage from '@react-native-community/async-storage';
import en from './en.json';
import ky from './ky.json';
import de from './de.json';
import vn from './vn.json';

const STORAGE_KEY = '@APP:languageCode';

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const savedDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
    const lng = (savedDataJSON) || null;
    const selectLanguage = lng || locale;
    callback(selectLanguage);
  },
  cacheUserLanguage: () => { },
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    resources: { en, ky, de, vn },
    ns: ['common'],
    defaultNS: 'common',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
