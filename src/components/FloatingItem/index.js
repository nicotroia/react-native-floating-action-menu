import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
} from 'react-native';

import { applyButtonWidth } from '@/helpers';

import globalStyles from '@/styles';
import styles from './styles';

const FloatingItem = props => {
  const {
    item,
    icon,
    index,
    isOpen,
    position,
    numItems,
    itemsDown,
    innerWidth,
    buttonWidth,
    primaryColor,
    itemFanAnimations,
    itemPressAnimations,
    backgroundUpColor,
    backgroundDownColor,
    borderColor: _borderColor,
    iconColor: _iconColor,
    onPressIn,
    onPressOut,
    onPress,
  } = props;
  const { label, labelStyle, isPending, isDisabled } = item;

  const pressAnimation = itemPressAnimations[index];
  const fanAnimation = itemFanAnimations[index];
  const itemDown = itemsDown[index];
  const [vPos, hPos] = position.split('-');
  const multiple = vPos.toLowerCase() === 'bottom' ? 1 : -1;
  const h = hPos.toLowerCase();

  const backgroundColor =
    pressAnimation &&
    pressAnimation.interpolate({
      inputRange: [0.0, 1.0],
      outputRange: [
        backgroundUpColor || '#ffffff',
        backgroundDownColor || primaryColor,
      ],
    });
  const translateY =
    fanAnimation &&
    fanAnimation.interpolate({
      inputRange: [0.0, 1.0],
      outputRange: [
        (buttonWidth + 14) * (numItems - index) * 0.5 * multiple,
        0,
      ],
    });
  const rotate =
    fanAnimation &&
    fanAnimation.interpolate({
      inputRange: [0.0, 1.0],
      outputRange: [`${15 * (numItems - index) * multiple}deg`, '0deg'],
    });
  const oppositeRotate =
    fanAnimation &&
    fanAnimation.interpolate({
      inputRange: [0.0, 1.0],
      outputRange: [`${-15 * (numItems - index) * multiple}deg`, '0deg'],
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
      inputRange: [0.0, 0.25, 1.0],
      outputRange: [0.0, 0.0, 1.0],
      extrapolate: 'clamp',
    });
  const fastOpacity =
    fanAnimation &&
    fanAnimation.interpolate({
      inputRange: [0.0, 0.8, 1.0],
      outputRange: [0.0, 0.0, 1.0],
      extrapolate: 'clamp',
    });

  let content = icon || (
    <Text
      style={[
        globalStyles.missingIcon,
        { color: itemDown ? '#fff' : _iconColor || primaryColor },
      ]}
    >
      {index}
    </Text>
  );

  if (isPending)
    content = (
      <ActivityIndicator
        size="small"
        color={_iconColor || primaryColor}
        style={styles.activityIndicator}
      />
    );
  const borderColor = isDisabled
    ? `${_borderColor || primaryColor}80`
    : _borderColor || primaryColor;

  return (
    <Animated.View
      key={`item-${index}`}
      style={[
        globalStyles.buttonOuter,
        applyButtonWidth(buttonWidth),
        {
          opacity,
          transform: fanAnimation
            ? [{ translateX: 0 }, { translateY }, { rotate }, { scale }]
            : [],
          borderColor,
          marginTop: buttonWidth * 0.3,
        },
      ]}
    >
      <View style={isDisabled && globalStyles.disabled}>
        <Animated.Text
          style={[
            globalStyles.text,
            styles.itemLabel,
            {
              opacity: fastOpacity,
              transform: fanAnimation ? [{ rotate: oppositeRotate }] : [],
              lineHeight: buttonWidth - 8,
              [h]: buttonWidth + 10,
              textAlign: h === 'right' ? 'right' : 'left',
            },
            labelStyle,
          ]}
        >
          {label}
        </Animated.Text>

        <TouchableWithoutFeedback
          style={globalStyles.button}
          disabled={isDisabled || isPending || !isOpen}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={onPress}
        >
          <Animated.View
            style={[
              globalStyles.buttonInner,
              applyButtonWidth(innerWidth),
              { backgroundColor },
            ]}
          >
            {content}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </Animated.View>
  );
};

export default FloatingItem;
