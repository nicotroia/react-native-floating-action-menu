import { Platform, StatusBar } from 'react-native';

import { Design } from '@/constants';

export const isPortrait = () => {
  return Design.window.height >= Design.window.width;
};

export const applyButtonWidth = (width = Design.buttonWidth) => ({
  width,
  height: width,
  borderRadius: width * 0.5,
});

export const isIphoneX = () =>
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (Design.window.height === 812 ||
    Design.window.width === 812 ||
    Design.window.height === 896 ||
    Design.window.width === 896);

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
