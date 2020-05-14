import { FloatingItem } from '@/components/FloatingItem/types';

export interface Props {
  isOpen: boolean;
  items: FloatingItem[],
  onToggle: () => void;
};

export interface State {
  dimmerActive: boolean;
  menuDown: boolean;
  itemsDown: object,
};
