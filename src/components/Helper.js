import AsyncStorage from '@react-native-community/async-storage';

export function converter(unit, value) {
  switch (unit) {
    case 'fahrenheit':
      return (value * 9 / 5) + 32
    case 'celsius':
      return value
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
