import React from 'react';
import { View, TouchableWithoutFeedback, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faTimes } from '@fortawesome/pro-regular-svg-icons';

import FloatingItem from '@/components/FloatingItem';
import { Colors, Design } from '@/constants';

import globalStyles from '@/styles';
import styles from './styles';

class FloatingMenu extends React.PureComponent {
  static defaultProps = {
    buttonWidth: Design.buttonWidth,
  };

  state = {
    dimmerActive: false,
    menuDown: false,
    itemsDown: {},
  };

  menuPressAnimation = new Animated.Value(0);
  itemPressAnimations = {};
  itemFanAnimations = {};
  dimmerTimeout = null;

  componentDidMount() {
    this.initAnimations();
  }

  componentDidUpdate(prevProps) {
    const { items, isOpen } = this.props;

    if (prevProps.items.length !== items.length) {
      this.initAnimations();
    }

    if (prevProps.isOpen && !isOpen) {
      // Close menu
      this.toggleMenu(false);
    } else if (!prevProps.isOpen && isOpen) {
      // Open menu
      this.toggleMenu(true);
    }
  }

  initAnimations = () => {
    const { items } = this.props;

    if (!this.menuPressAnimation)
      this.menuPressAnimation = new Animated.Value(0);
    for (let i = 0; i < items.length; i++) {
      if (!this.itemPressAnimations[i]) {
        this.itemPressAnimations[i] = new Animated.Value(0);
      }
      if (i < items.length && !this.itemFanAnimations[i]) {
        this.itemFanAnimations[i] = new Animated.Value(0);
      }
    }
  };

  handleItemPressIn = (index, animatedValue) => () => {
    // Animate in
    Animated.timing(animatedValue, {
      fromValue: 0.0,
      toValue: 1.0,
      duration: 14,
    }).start();

    if (index === null) {
      this.setState({ menuDown: true });
    } else {
      this.setState({ itemsDown: { ...this.state.itemsDown, [index]: true } });
    }
  };

  handleItemPressOut = (index, animatedValue) => () => {
    // Animate out
    Animated.timing(animatedValue, {
      fromValue: 1.0,
      toValue: 0.0,
      duration: 142,
    }).start();

    if (index === null) {
      this.setState({ menuDown: false });
    } else {
      this.setState({ itemsDown: { ...this.state.itemsDown, [index]: false } });
    }
  };

  handleItemPress = index => () => {
    const { items } = this.props;
    const item = items[index];

    if (!item) return;

    item.onPress && item.onPress(item, index);
  };

  handleMenuPress = () => {
    const isOpen = !this.props.isOpen;

    this.toggleMenu(isOpen);
  };

  toggleMenu = isOpen => {
    const { items, onToggle } = this.props;

    const options = {
      fromValue: isOpen ? 0.0 : 1.0,
      toValue: isOpen ? 1.0 : 0.0,
      duration: 142,
      tension: 30,
      friction: 5,
    };

    this.dimmerTimeout && clearTimeout(this.dimmerTimeout);
    if (isOpen) {
      this.setState({ dimmerActive: true });
    } else {
      // Deactivate dimmer after animation completes
      this.dimmerTimeout = setTimeout(() => {
        this.setState({ dimmerActive: false });
      }, 200);
    }

    // Fan items
    for (let i = 0; i < items.length; i++) {
      Animated.delay((items.length - i) * 80).start(() => {
        Animated.spring(this.itemFanAnimations[i], options).start();
      });
    }

    onToggle && isOpen !== this.props.isOpen && onToggle(isOpen);
  };

  renderItems = () => {
    const { items, isOpen, buttonWidth } = this.props;
    const { itemsDown, dimmerActive } = this.state;

    return items.map((item, index) => {
      return (
        <FloatingItem
          {...item}
          key={`item-${index}`}
          index={index}
          isOpen={isOpen || dimmerActive}
          itemsDown={itemsDown}
          buttonWidth={buttonWidth}
          itemFanAnimations={this.itemFanAnimations}
          itemPressAnimations={this.itemPressAnimations}
          onPress={this.handleItemPress(index)}
          onPressIn={this.handleItemPressIn(
            index,
            this.itemPressAnimations[index]
          )}
          onPressOut={this.handleItemPressOut(
            index,
            this.itemPressAnimations[index]
          )}
        />
      );
    });
  };

  renderMenuButton = () => {
    const { isOpen } = this.props;
    const { menuDown } = this.state;

    const backgroundColor = this.menuPressAnimation.interpolate({
      inputRange: [0.0, 1.0],
      outputRange: ['#ffffff', Colors.primaryColor],
    });

    return (
      <View style={styles.buttonOuter}>
        <TouchableWithoutFeedback
          style={styles.button}
          onPressIn={this.handleItemPressIn(null, this.menuPressAnimation)}
          onPressOut={this.handleItemPressOut(null, this.menuPressAnimation)}
          onPress={this.handleMenuPress}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        >
          <Animated.View style={[styles.buttonInner, { backgroundColor }]}>
            <FontAwesomeIcon
              style={styles.menuIcon}
              color={menuDown ? '#fff' : Colors.primaryColor}
              icon={isOpen ? faTimes : faBars}
              size={25}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderDimmer = () => {
    const { isOpen } = this.props;
    const { dimmerActive } = this.state;

    const fanAnimation = this.itemFanAnimations[0];
    const opacity =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [0.0, 1.0],
        extrapolate: 'clamp',
      });

    return dimmerActive ? (
      <TouchableWithoutFeedback
        disabled={!isOpen}
        onPress={this.handleMenuPress}
      >
        <Animated.View
          style={[globalStyles.dimmer, styles.dimmer, { opacity }]}
        />
      </TouchableWithoutFeedback>
    ) : null;
  };

  render = () => {
    const { items } = this.props;

    if (!items || !items.length) return null;

    return (
      <View style={styles.container} pointerEvents="box-none">
        <View style={styles.itemContainer} pointerEvents="box-none">
          {this.renderItems()}
          {this.renderMenuButton()}
        </View>
        {this.renderDimmer()}
      </View>
    );
  };
}

export default FloatingMenu;
