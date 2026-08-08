import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from "react-native";

export type Position =
  | "top-left"
  | "top-right"
  | "bottom-right"
  | "bottom-left";

export type ItemConfig = {
  label: React.ReactNode;
  /** Override the label read by screen readers. Auto-derived from label if it is a plain string. */
  accessibilityLabel?: string;
  labelStyle?: StyleProp<TextStyle>;
  isPending?: boolean;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonInnerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent, index: number) => void;
} & ViewProps;
