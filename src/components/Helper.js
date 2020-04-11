import AsyncStorage from '@react-native-community/async-storage';

export function convertCelsius(outputUnit, value) {
  switch (outputUnit) {
    case 'C':

      return (value * 9 / 5) + 32
    default:
      return value
  }
}

export const asyncStorageGetItem = async (item) => {
  try {
    const value = await AsyncStorage.getItem(item);
    return value;
  } catch (error) {
    // TODO: Error handling
  }
}

export const asyncStorageSetItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // TODO: Error handling
  }
}
