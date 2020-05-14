export interface FloatingItem {
  label: string;
  icon: any;
  iconSize?: number;
  iconStyle?: any;
  isPending?: boolean;
  isSuccess?: boolean;
  isDisabled?: boolean;
  onPress: () => void;
};

export interface Props extends FloatingItem {
  index: number;
  isOpen: boolean;
  itemsDown: object;
  buttonWidth: number;
  itemFanAnimations: object;
  itemPressAnimations: object;
  onPressIn: () => void;
  onPressOut: () => void;
}

export interface State {};
