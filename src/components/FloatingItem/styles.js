import { StyleSheet } from 'react-native';

import { Design, Colors } from '@/constants';

const innerWidth = Design.buttonWidth - 12;

export default StyleSheet.create({
  buttonOuter: {
    width: Design.buttonWidth,
    height: Design.buttonWidth,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: Colors.primaryColor,
    borderRadius: Design.buttonWidth * 0.5,
    marginTop: 14,
    elevation: 5,
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 7,
  },

  button: {},

  buttonInner: {
    width: innerWidth,
    height: innerWidth,
    borderRadius: innerWidth * 0.5,
    padding: 9,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 7,
  },

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
