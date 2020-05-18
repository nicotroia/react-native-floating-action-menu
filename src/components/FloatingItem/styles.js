import { StyleSheet } from 'react-native';

import { Design } from '@/constants';

export default StyleSheet.create({
  itemLabel: {
    lineHeight: 20,
    width: 150,
    position: 'absolute',
    top: Design.buttonWidth * 0.5 - 12,
    zIndex: 7,
    transform: [{ rotate: '0deg' }],
  },

  activityIndicator: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});
