import React from 'react';
import {View} from 'react-native';
import {Dropdown as MaterialDropdown} from 'react-native-material-dropdown';

import styles from './styles';

const Dropdown = props => {
  const {
    containerStyle,
    dropdownContainerStyle,
    inputContainerStyle,
    itemTextStyle,
    overlayStyle,
    pickerStyle,
    ...rest
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <MaterialDropdown
        {...rest}
        containerStyle={[styles.dropdownContainer, dropdownContainerStyle]}
        inputContainerStyle={[styles.inputContainer, inputContainerStyle]}
        itemTextStyle={[styles.itemTextStyle, itemTextStyle]}
        overlayStyle={[styles.overlay, overlayStyle]}
        pickerStyle={[styles.picker, pickerStyle]}
        dropdownOffset={{top: 14, left: 0}}
        hitSlop={{top: 0, left: 7, right: 7, bottom: 7}}
        rippleInsets={{top: 4, bottom: 4}}
        itemPadding={8}
      />
    </View>
  );
};

export default Dropdown;
