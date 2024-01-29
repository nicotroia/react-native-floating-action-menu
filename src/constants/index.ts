import { Dimensions } from "react-native";

import { Position } from "@/types";

const window = Dimensions.get("window");

export const Design = {
  window,
};

export const Colors = {
  primaryColor: "#213A77",
  secondaryColor: "#4A6CB4",
  readableBlack: "#2b2b2b",
  link: "#0099ff",
};

export const MenuPositions: Record<string, Position> = {
  topLeft: "top-left",
  topRight: "top-right",
  bottomLeft: "bottom-left",
  bottomRight: "bottom-right",
};
