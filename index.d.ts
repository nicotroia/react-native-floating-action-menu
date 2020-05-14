declare module "react-native-floating-action-menu" {
  import { Component } from "react";
  
  import { FloatingItem as FloatingItemType, Props as IFloatingMenuProps } from './dist/src/components/FloatingMenu/types';
  import { Props as IFloatingItemProps } from './dist/src/components/FloatingItem/types';

  export interface FloatingItem extends FloatingItemType {}
  export class FloatingMenuComponent extends Component<IFloatingMenuProps> {}
  export class FloatingItemComponent extends Component<IFloatingItemProps> {}
}
