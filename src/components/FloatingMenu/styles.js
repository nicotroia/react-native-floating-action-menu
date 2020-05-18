import { StyleSheet } from 'react-native';

import { Design } from '@/constants';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 5,
  },

  itemContainer: {
    position: 'absolute',
    width: Design.buttonWidth,
    minHeight: Design.buttonWidth,
    zIndex: 7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  dimmer: {
    zIndex: 5,
  },

  activityIndicator: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },

  closeIcon: {
    fontSize: 33,
    lineHeight: 32,
  },

  menuIcon: {
    fontSize: 31,
    lineHeight: 31,
  },
});
