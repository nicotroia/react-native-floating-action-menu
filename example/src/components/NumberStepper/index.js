import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { globalStyles } from 'react-native-floating-action-menu';

import styles from './styles';

const repeatDelay = 420;
const repeatInterval = 100;

class NumberStepper extends React.PureComponent {
  incrementDelayTimer = null;
  incrementIntervalTimer = null;
  decrementDelayTimer = null;
  decrementIntervalTimer = null;

  increment = () => {
    const { value, onChange, max } = this.props;

    let newVal = value + 1;
    if (newVal > max) {
      newVal = max;
    }

    onChange(newVal);
  };

  decrement = () => {
    const { value, onChange, min } = this.props;

    let newVal = value - 1;
    if (newVal < min) {
      newVal = min;
    }

    onChange(newVal);
  };

  handleIncrementPressIn = () => {
    this.increment();
    this.startIncrementTimer();
  };

  handleDecrementPressIn = () => {
    this.decrement();
    this.startDecrementTimer();
  };

  startIncrementTimer = () => {
    this.incrementDelayTimer = setTimeout(() => {
      this.increment();
      this.incrementIntervalTimer = setInterval(() => {
        this.increment();
      }, repeatInterval);
    }, repeatDelay);
  };

  startDecrementTimer = () => {
    this.decrementDelayTimer = setTimeout(() => {
      this.decrement();
      this.decrementIntervalTimer = setInterval(() => {
        this.decrement();
      }, repeatInterval);
    }, repeatDelay);
  };

  stopIncrementTimer = () => {
    if (this.incrementDelayTimer) {
      clearTimeout(this.incrementDelayTimer);
      this.incrementDelayTimer = null;
    }
    if (this.incrementIntervalTimer) {
      clearTimeout(this.incrementIntervalTimer);
      this.incrementIntervalTimer = null;
    }
  };

  stopDecrementTimer = () => {
    if (this.decrementDelayTimer) {
      clearTimeout(this.decrementDelayTimer);
      this.decrementDelayTimer = null;
    }
    if (this.decrementIntervalTimer) {
      clearTimeout(this.decrementIntervalTimer);
      this.decrementIntervalTimer = null;
    }
  };

  render() {
    const { value, min, max } = this.props;

    const decrementDisabled = value <= min;
    const incrementDisabled = value >= max;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPressIn={this.handleDecrementPressIn}
          onPressOut={this.stopDecrementTimer}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          disabled={decrementDisabled}
          style={decrementDisabled ? styles.disabled : null}
        >
          <FontAwesomeIcon
            style={styles.decrementButton}
            size={24}
            icon={faMinus}
          />
        </TouchableOpacity>
        <Text style={[globalStyles.text, styles.value]}>{value}</Text>
        <TouchableOpacity
          onPressIn={this.handleIncrementPressIn}
          onPressOut={this.stopIncrementTimer}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          disabled={incrementDisabled}
          style={incrementDisabled ? styles.disabled : null}
        >
          <FontAwesomeIcon
            style={styles.incrementButton}
            size={24}
            icon={faPlus}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

NumberStepper.defaultProps = {
  min: 0,
  max: 99,
};

export default NumberStepper;
