import { StyleSheet } from 'react-native';

import { Colors } from '../constants';

const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 14,
  },
  h1: {
    fontSize: 30,
    letterSpacing: 1,
    marginBottom: 30,
    marginTop: 7,
    color: Colors.primaryColor,
  },
  h2: {
    fontSize: 24,
    letterSpacing: 0.9,
    marginBottom: 21,
    marginTop: 4,
    color: Colors.secondaryColor,
  },
  h3: {
    fontSize: 16,
    letterSpacing: 0.7,
    marginBottom: 12,
    marginTop: 2,
    color: Colors.secondaryColor,
  },
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
  error: {
    color: Colors.danger,
  },
  strike: {
    textDecorationLine: 'line-through',
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
    backgroundColor: '#ffffffdd',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dimmerInvert: {
    backgroundColor: `${Colors.darkBlue}f0`,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  col: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  light: {
    backgroundColor: Colors.readableWhite,
    tintColor: Colors.readableWhite,
  },
  dark: {
    backgroundColor: Colors.readableBlack,
    tintColor: Colors.readableBlack,
  },
});

export default globalStyles;
