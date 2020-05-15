declare module "react-native-floating-action-menu" {
  import { Component } from "react";
  
  import { FloatingItem as FloatingItemType, Props as IFloatingMenuProps } from './src/components/FloatingMenu/types';
  import { Props as IFloatingItemProps } from './src/components/FloatingItem/types';

  export interface FloatingMenu extends Component {}
  export interface FloatingItem extends FloatingItemType {}
  export class FloatingMenuComponent extends Component<IFloatingMenuProps> {}
  export class FloatingItemComponent extends Component<IFloatingItemProps> {}
}
