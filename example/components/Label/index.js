import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from 'react-native-floating-action-menu';

import styles from './styles';

export default function Label({
  label,
  active = false,
  disabled,
  isOptional = false,
  inputValue = '',
  style,
  textStyle,
  children,
}) {
  return (
    <View style={[styles.container, style, disabled && globalStyles.disabled]}>
      {(active || inputValue) && (
        <Text style={[globalStyles.text, styles.text, textStyle]}>
          {`${label}${isOptional ? ' (optional)' : ''}`}
        </Text>
      )}
      {children}
    </View>
  );
}
