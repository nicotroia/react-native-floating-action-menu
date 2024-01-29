import React from 'react';
import {View, Text} from 'react-native';
import {globalStyles} from 'react-native-floating-action-menu';

import styles from './styles';

const Label = props => {
  const {
    label,
    active,
    disabled,
    isOptional,
    inputValue,
    style,
    textStyle,
    children,
  } = props;

  return (
    <View style={[styles.container, style, disabled && globalStyles.disabled]}>
      {active || inputValue ? (
        <Text style={[globalStyles.text, styles.text, textStyle]}>{`${label}${
          isOptional ? ' (optional)' : ''
        }`}</Text>
      ) : null}
      {children}
    </View>
  );
};

Label.defaultProps = {
  active: false,
  isOptional: false,
  inputValue: '',
  textStyle: '',
};

export default Label;
