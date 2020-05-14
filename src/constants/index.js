import { Dimensions, Platform, StatusBar } from 'react-native';

import { getStatusBarHeight } from '@/helpers';

export const window = Dimensions.get('window');
export const statusBarHeight =
  Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;

export const Design = {
  window,
  statusBarHeight,
  buttonWidth: Math.min(window.width * 0.14, 80),
};

export const Colors = {
  primaryColor: '#213A77',
  secondaryColor: '#4A6CB4',
  tertiaryColor: '#b0bfe0',
  borderColor: '#5E6064',

  link: '#0099ff',
  black: '#37392E',
  white: '#fff',
  darkGrey: '#4D515A',
  grey: '#717680',
  middleGrey: '#bcc0c9',
  lightGrey: '#d9d8db',
  gold: '#f3da63',
  readableBlack: '#26263A',
  readableWhite: '#FAF7F8',
  darkBlue: '#1e253e',
  brightRed: '#f02973',

  success: '#C3E6B6',
  successHover: '#9BD286',
  successDark: '#52923A',
  info: '#d9edf7',
  infoHover: '#AFCAD8',
  warn: '#C9B75B',
  warnHover: '#AD992F',
  danger: '#CF5555',
  dangerHover: '#B24141',
};
