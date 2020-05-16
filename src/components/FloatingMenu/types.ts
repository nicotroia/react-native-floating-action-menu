import { FloatingItem } from '@/FloatingItem/types';

export interface Props {
  isOpen: boolean;
  items: FloatingItem[],
  menuIcon?: JSX.Element,
  onToggle: () => void;
};

export interface State {
  dimmerActive: boolean;
  menuDown: boolean;
  itemsDown: object,
};
