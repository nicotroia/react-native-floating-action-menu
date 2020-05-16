import { Dimensions } from 'react-native';

const window = Dimensions.get('window');
const buttonWidth = Math.min(window.width * 0.14, 80);

export const Design = {
  window,
  buttonWidth,
};

export const Colors = {
  primaryColor: '#213A77',
  secondaryColor: '#4A6CB4',
  link: '#0099ff',
};
