import { Platform, StatusBar } from 'react-native';

import { Design } from '@/constants';

const { window } = Design;

export const isPortrait = () => {
  return window.height >= window.width;
};

export const isIphoneX = () =>
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (window.height === 812 ||
    window.width === 812 ||
    window.height === 896 ||
    window.width === 896);

export const ifIphoneX = (iphoneXStyle, regularStyle) => {
  if (isIphoneX()) return iphoneXStyle;

  return regularStyle;
};

export const getStatusBarHeight = safe =>
  Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
