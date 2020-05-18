import { StyleSheet } from 'react-native';
import { constants } from 'react-native-floating-action-menu';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  value: {
    width: 100,
    fontSize: 38,
    lineHeight: 42,
    paddingHorizontal: 21,
    margin: 0,
    textAlign: 'center',
  },

  incrementButton: {
    fontSize: 24,
    lineHeight: 24,
    alignSelf: 'center',
    // color: constants.Colors.primaryColor,
  },

  decrementButton: {
    fontSize: 24,
    lineHeight: 24,
    alignSelf: 'center',
    // color: constants.Colors.primaryColor,
  },

  disabled: {
    opacity: 0.35,
  },
});

export default styles;
