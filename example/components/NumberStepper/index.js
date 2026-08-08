import React, { useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { globalStyles } from 'react-native-floating-action-menu';

import styles from './styles';

const REPEAT_DELAY = 420;
const REPEAT_INTERVAL = 100;

export default function NumberStepper({ value, onChange, min = 0, max = 99 }) {
  const incrementDelay = useRef(null);
  const incrementInterval = useRef(null);
  const decrementDelay = useRef(null);
  const decrementInterval = useRef(null);

  const increment = useCallback(() => {
    onChange(prev => Math.min(prev + 1, max));
  }, [onChange, max]);

  const decrement = useCallback(() => {
    onChange(prev => Math.max(prev - 1, min));
  }, [onChange, min]);

  const handleIncrementPressIn = useCallback(() => {
    increment();
    incrementDelay.current = setTimeout(() => {
      incrementInterval.current = setInterval(increment, REPEAT_INTERVAL);
    }, REPEAT_DELAY);
  }, [increment]);

  const handleIncrementPressOut = useCallback(() => {
    clearTimeout(incrementDelay.current);
    clearInterval(incrementInterval.current);
  }, []);

  const handleDecrementPressIn = useCallback(() => {
    decrement();
    decrementDelay.current = setTimeout(() => {
      decrementInterval.current = setInterval(decrement, REPEAT_INTERVAL);
    }, REPEAT_DELAY);
  }, [decrement]);

  const handleDecrementPressOut = useCallback(() => {
    clearTimeout(decrementDelay.current);
    clearInterval(decrementInterval.current);
  }, []);

  const decrementDisabled = value <= min;
  const incrementDisabled = value >= max;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={handleDecrementPressIn}
        onPressOut={handleDecrementPressOut}
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        disabled={decrementDisabled}
        style={decrementDisabled ? styles.disabled : null}>
        <FontAwesomeIcon style={styles.decrementButton} size={24} icon={faMinus} />
      </TouchableOpacity>
      <Text style={[globalStyles.text, styles.value]}>{value}</Text>
      <TouchableOpacity
        onPressIn={handleIncrementPressIn}
        onPressOut={handleIncrementPressOut}
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        disabled={incrementDisabled}
        style={incrementDisabled ? styles.disabled : null}>
        <FontAwesomeIcon style={styles.incrementButton} size={24} icon={faPlus} />
      </TouchableOpacity>
    </View>
  );
}
