import { StyleSheet } from 'react-native';

import { Design, Colors } from '../../constants';

export default StyleSheet.create({
  itemIcon: {
    marginBottom: 2,
    color: Colors.primaryColor,
  },

  itemLabel: {
    lineHeight: 20,
    width: 150,
    textAlign: 'right',
    position: 'absolute',
    top: Design.buttonWidth * 0.5 - 12,
    left: -171,
    zIndex: 7,
    transform: [{ rotate: '0deg' }],
  },

  activityIndicator: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});
