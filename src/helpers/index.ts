import { PixelRatio, Platform, StatusBar } from "react-native";

import { Design } from "@/constants";

export const isPortrait = () => {
  return Design.window.height >= Design.window.width;
};

export const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  const adjustedWidth = Design.window.width * pixelDensity;
  const adjustedHeight = Design.window.height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
};

export const getButtonWidth = () =>
  Math.floor(
    Math.min(
      Math.min(Design.window.width, Design.window.height) *
        (isTablet() ? 0.1 : 0.14),
      80
    )
  );

export const applyButtonWidth = width => ({
  width,
  height: width,
  borderRadius: width * 0.5,
});

export const isIphoneX = () =>
  Platform.OS === "ios" &&
  !Platform.isPad &&
  !Platform.isTV &&
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
