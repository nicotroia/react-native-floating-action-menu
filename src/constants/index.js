import { Dimensions } from 'react-native';

const window = Dimensions.get('window');
const buttonWidth = Math.min(Math.min(window.width, window.height) * 0.14, 80);

export const Design = {
  window,
  buttonWidth,
};

export const Colors = {
  primaryColor: '#213A77',
  secondaryColor: '#4A6CB4',
  readableBlack: '#2b2b2b',
  link: '#0099ff',
};

export const MenuPositions = {
  topLeft: 'top-left',
  topRight: 'top-right',
  bottomLeft: 'bottom-left',
  bottomRight: 'bottom-right',
};
