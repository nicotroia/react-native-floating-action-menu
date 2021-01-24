import { StyleSheet } from 'react-native';

import { Colors } from '@/constants';

const globalStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.6,
    color: Colors.readableBlack,
  },
  link: {
    color: Colors.link,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  disabled: {
    opacity: 0.5,
  },
  dimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 6,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffffdd',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonOuter: {
    backgroundColor: '#fff',
    borderWidth: 3,
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
    // width: Design.innerWidth,
    // height: Design.innerWidth,
    // borderRadius: Design.innerWidth * 0.5,
    padding: 9,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 7,
  },

  missingIcon: {
    color: Colors.primaryColor,
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'center',
  },
});

export default globalStyles;
