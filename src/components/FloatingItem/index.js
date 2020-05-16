import React from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
} from 'react-native';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCheck, faQuestion } from '@fortawesome/free-regular-svg-icons';

import { applyButtonWidth } from '@/helpers';

import globalStyles from '@/styles';
import styles from './styles';

class FloatingItem extends React.PureComponent {
  render() {
    const {
      // Item
      label,
      icon,
      iconSize,
      iconStyle,
      isPending,
      // isSuccess,
      isDisabled,
      onPressIn,
      onPressOut,
      onPress,
      // Props
      index,
      isOpen,
      numItems,
      itemsDown,
      innerWidth,
      buttonWidth,
      primaryColor,
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
        outputRange: ['#ffffff', primaryColor],
      });
    const translateY =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [(buttonWidth + 14) * (numItems - index) * 0.5, 0],
      });
    const rotate =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [`${15 * (numItems - index)}deg`, '0deg'],
      });
    const oppositeRotate =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [`${-15 * (numItems - index)}deg`, '0deg'],
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

    // let content = icon ? (
    //   <FontAwesomeIcon
    //     style={[
    //       styles.itemIcon,
    //       { color: itemDown ? '#fff' : primaryColor },
    //       iconStyle,
    //     ]}
    //     icon={icon}
    //     size={iconSize || 25}
    //   />
    // ) : (
    let content = icon || (
      <Text style={[globalStyles.missingIcon, { color: itemDown ? '#fff' : primaryColor }]}>{index}</Text>
    );

    if (isPending)
      content = (
        <ActivityIndicator
          size="small"
          color={primaryColor}
          style={styles.activityIndicator}
        />
      );

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
          },
          isDisabled && globalStyles.disabled,
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
            isDisabled && globalStyles.disabled,
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
          <Animated.View style={[globalStyles.buttonInner, applyButtonWidth(innerWidth), { backgroundColor }]}>
            {content}
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

export default FloatingItem;
