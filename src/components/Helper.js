import AsyncStorage from '@react-native-community/async-storage';

export function converter(unit, value) {
  switch (unit) {
    case 'fahrenheit':
      return (value * 9 / 5) + 32
    case 'celsius':
      return value
    case 'inch':
      return value / 25.4
    case 'kilometers per hour':
      return value * 3.6
    case 'miles per hour':
      return value * 2.2369
    case 'beaufort':
      return value * 1.1268 // TODO: Check this
    case 'knot':
      return value * 1.9438
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

export function getWindDirectionArrow(windDirection) {
  const directions = ['↓', '↙', '←', '↖', '↑', '↗', '→', '↘'];
  return directions[Math.round(windDirection / 45) % 8];
}
