import {StyleSheet} from 'react-native';

const inputHeight = 50;

export default StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 10,
  },

  dropdownContainer: {
    width: '100%',
    marginTop: 7,
  },

  picker: {},

  itemTextStyle: {
    height: inputHeight,
    lineHeight: inputHeight,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  inputContainer: {
    borderBottomColor: '#bcc0c9',
    borderBottomWidth: 1,
    marginTop: -9,
  },

  labelText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlay: {},
});
