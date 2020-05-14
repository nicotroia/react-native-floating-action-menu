import { StyleSheet, Platform } from 'react-native';

import { Design } from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: 'red',
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
    bottom: Platform.select({
      ios: 32,
      android: 22,
    }),
    right: Platform.select({
      ios: 38,
      android: 28,
    }),
    width: Design.buttonWidth,
    minHeight: Design.buttonWidth,
    zIndex: 7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  menuIcon: {},

  dimmer: {
    zIndex: 5,
  },

  activityIndicator: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});
