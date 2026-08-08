import { Dimensions, PixelRatio } from "react-native";

export const isPortrait = () => {
  const { width, height } = Dimensions.get("window");
  return height >= width;
};

export const isTablet = () => {
  const { width, height } = Dimensions.get("window");
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  }
  return (
    pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  );
};

export const getButtonWidth = () => {
  const { width, height } = Dimensions.get("window");
  return Math.floor(
    Math.min(Math.min(width, height) * (isTablet() ? 0.1 : 0.14), 80)
  );
};

export const applyButtonWidth = (width: number) => ({
  width,
  height: width,
  borderRadius: width * 0.5,
});
