import React from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faQuestion } from '@fortawesome/free-regular-svg-icons';

import globalStyles from '../../styles';

class FloatingItem extends React.PureComponent {
  render() {
    const {
      // Item
      label,
      icon,
      iconSize,
      iconStyle,
      isPending,
      isSuccess,
      isDisabled,
      onPressIn,
      onPressOut,
      onPress,
      // Props
      index,
      isOpen,
      itemsDown,
      buttonWidth,
      itemFanAnimations,
      itemPressAnimations,
    } = this.props;

    const pressAnimation = itemPressAnimations[index];
    const fanAnimation = itemFanAnimations[index];
    const itemDown = itemsDown[index];

    const backgroundColor =
      pressAnimation &&
      pressAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: ['#ffffff', vars.primaryColor],
      });
    const translateY =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [(buttonWidth + 14) * (items.length - index), 0],
      });
    const rotate =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [`${30 * (items.length - index)}deg`, '0deg'],
      });
    const oppositeRotate =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [`${-30 * (items.length - index)}deg`, '0deg'],
      });
    const scale =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [0.8, 1.0],
      });
    const opacity =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [0.0, 1.0],
        extrapolate: 'clamp',
      });
    const fastOpacity =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 0.8, 1.0],
        outputRange: [0.0, 0.0, 1.0],
        extrapolate: 'clamp',
      });

    let content = isSuccess ? (
      <FontAwesomeIcon
        style={[
          styles.itemIcon,
          { color: itemDown ? '#fff' : vars.primaryColor, marginTop: 3 },
        ]}
        icon={faCheck}
        size={21}
      />
    ) : (
      <FontAwesomeIcon
        style={[
          styles.itemIcon,
          { color: itemDown ? '#fff' : vars.primaryColor },
          iconStyle,
        ]}
        icon={icon || faQuestion}
        size={iconSize || 25}
      />
    );

    if (isPending)
      content = (
        <ActivityIndicator
          size="small"
          color={vars.primaryColor}
          style={styles.activityIndicator}
        />
      );

    return (
      <Animated.View
        key={`item-${index}`}
        style={[
          styles.buttonOuter,
          {
            opacity,
            transform: fanAnimation
              ? [{ translateX: 0 }, { translateY }, { rotate }, { scale }]
              : [],
          },
          isOpen && (isDisabled || isSuccess) && globalStyles.disabled,
        ]}
      >
        <Animated.Text
          style={[
            globalStyles.text,
            styles.itemLabel,
            {
              opacity: fastOpacity,
              transform: fanAnimation ? [{ rotate: oppositeRotate }] : [],
            },
            isOpen && (isDisabled || isSuccess) && globalStyles.disabled,
          ]}
        >
          {label}
        </Animated.Text>

        <TouchableWithoutFeedback
          style={styles.button}
          disabled={isDisabled || isPending || isSuccess || !isOpen}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={onPress}
        >
          <Animated.View style={[styles.buttonInner, { backgroundColor }]}>
            {content}
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

export default FloatingItem;
