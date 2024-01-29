import React from "react";
import {
  Animated,
  StyleProp,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

import { FloatingItem } from "@/components/FloatingItem";
import { Colors, MenuPositions } from "@/constants";
import { applyButtonWidth, getButtonWidth } from "@/helpers";
import { ItemConfig, Position } from "@/types";

import styles from "./styles";
import globalStyles from "@/styles";

export type RenderState = {
  dimmerActive: boolean;
  menuButtonDown: boolean;
  itemsDown: Record<number, boolean>;
  items: [];
  buttonWidth: 0;
  innerWidth: 0;
};

export type FloatingMenuProps = {
  items: ItemConfig[];
  buttonWidth?: number;
  innerWidth?: number;
  isOpen: boolean;
  onItemPress?: (item: ItemConfig, index: number) => void;
  position: Position;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  containerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  onMenuToggle?: (open: boolean) => void;
  openEase: Function;
  closeEase: Function;
  renderItemIcon?: (
    item: ItemConfig,
    index: number,
    props: RenderState
  ) => React.ReactNode;
  backgroundUpColor?: string;
  backgroundDownColor?: string;
  borderColor?: string;
  iconColor?: string;
  primaryColor: string;
  renderMenuIcon?: (props: RenderState) => React.ReactNode;
  buttonOuterStyle?: StyleProp<ViewStyle>;
  buttonTouchableStyle?: StyleProp<ViewStyle>;
  buttonInnerStyle?: StyleProp<ViewStyle>;
  dimmerStyle?: StyleProp<ViewStyle>;
};

export class FloatingMenu extends React.PureComponent<
  FloatingMenuProps,
  RenderState
> {
  state: Readonly<RenderState> = {
    dimmerActive: false,
    menuButtonDown: false,
    itemsDown: {},
    items: [],
    buttonWidth: 0,
    innerWidth: 0,
  };

  menuPressAnimation = new Animated.Value(0);
  itemPressAnimations = {};
  itemFanAnimations = {};
  dimmerTimeout: ReturnType<typeof setTimeout> | null = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    const { items, buttonWidth, innerWidth } = nextProps;

    return {
      ...prevState,
      items: [...items].reverse(),
      buttonWidth: buttonWidth || getButtonWidth(),
      innerWidth: innerWidth || getButtonWidth() * 0.8,
    };
  }

  componentDidMount() {
    this.initAnimations();
  }

  componentDidUpdate(prevProps) {
    const { isOpen } = this.props;
    const { items } = this.state;

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
    const { items } = this.state;

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

  handleItemPressIn =
    (index, animatedValue, useNativeDriver = false) =>
    () => {
      // Animate in
      Animated.timing(animatedValue, {
        toValue: 1.0,
        duration: 14,
        useNativeDriver,
      }).start();

      if (index === null) {
        this.setState({ menuButtonDown: true });
      } else {
        this.setState({
          itemsDown: { ...this.state.itemsDown, [index]: true },
        });
      }
    };

  handleItemPressOut =
    (index, animatedValue, useNativeDriver = false) =>
    () => {
      // Animate out
      Animated.timing(animatedValue, {
        toValue: 0.0,
        duration: 142,
        useNativeDriver,
      }).start();

      if (index === null) {
        this.setState({ menuButtonDown: false });
      } else {
        this.setState({
          itemsDown: { ...this.state.itemsDown, [index]: false },
        });
      }
    };

  handleItemPress = index => event => {
    const { onItemPress } = this.props;
    const { items } = this.state;
    const item: ItemConfig = items[index];

    if (!item) return;

    if (item.onPress) {
      item.onPress(event, index);
    } else if (onItemPress) {
      onItemPress(item, index);
    }
  };

  handleMenuPress = () => {
    const { isOpen, onMenuToggle } = this.props;

    onMenuToggle?.(!isOpen);
  };

  toggleMenu = isOpen => {
    const { openEase, closeEase } = this.props;
    const { items } = this.state;

    const options = {
      toValue: isOpen ? 1.0 : 0.0,
      duration: 142 - Math.max(items.length - 2, 0) * 5,
      tension: 30,
      friction: 5,
      useNativeDriver: true,
    };

    // Fan items
    let totalDelay = 0;
    for (let i = 0; i < items.length; i++) {
      const t = (isOpen ? i : items.length - i - 1) / items.length;
      const ease = isOpen ? openEase(t) : closeEase(t);
      const time = (150 / Math.min(Math.max(items.length, 0), 8)) * i + 160;
      const delay = Math.max(Math.min(time * ease, 300), 0);

      totalDelay = delay + time;

      Animated.delay(delay).start(() => {
        Animated.spring(this.itemFanAnimations[i], options).start();
      });
    }

    // Toggle dimmer
    this.dimmerTimeout && clearTimeout(this.dimmerTimeout);
    if (isOpen) {
      this.setState({ dimmerActive: true });
    } else {
      // Deactivate dimmer after animation completes
      this.dimmerTimeout = setTimeout(() => {
        this.setState({ dimmerActive: false });
      }, totalDelay);
    }
  };

  renderItems = () => {
    const {
      isOpen,
      position,
      renderItemIcon,
      backgroundUpColor,
      backgroundDownColor,
      borderColor,
      iconColor,
      primaryColor,
    } = this.props;
    const { items, itemsDown, dimmerActive, buttonWidth, innerWidth } =
      this.state;

    if (!dimmerActive) return null;

    return items.map((item: ItemConfig, index) => {
      if (!item) return null;

      return (
        <FloatingItem
          key={`item-${index}`}
          {...item}
          item={item}
          index={index}
          icon={
            renderItemIcon
              ? renderItemIcon(item, index, { ...this.state })
              : null
          }
          position={position}
          isOpen={isOpen || dimmerActive}
          backgroundUpColor={backgroundUpColor}
          backgroundDownColor={backgroundDownColor}
          borderColor={borderColor}
          iconColor={iconColor}
          primaryColor={primaryColor}
          buttonWidth={buttonWidth}
          innerWidth={innerWidth}
          numItems={items.length}
          itemsDown={itemsDown}
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
    const {
      renderMenuIcon,
      isOpen,
      backgroundUpColor,
      backgroundDownColor,
      borderColor: _borderColor,
      iconColor: _iconColor,
      primaryColor,
      buttonOuterStyle,
      buttonTouchableStyle,
      buttonInnerStyle,
    } = this.props;
    const { menuButtonDown, buttonWidth, innerWidth } = this.state;

    const iconColor = _iconColor || primaryColor;
    const borderColor = _borderColor || primaryColor;
    const backgroundColor = this.menuPressAnimation.interpolate({
      inputRange: [0.0, 1.0],
      outputRange: [
        backgroundUpColor || "#ffffff",
        backgroundDownColor || primaryColor,
      ],
    });

    const content = renderMenuIcon ? (
      renderMenuIcon({ ...this.state })
    ) : (
      <Text
        style={[
          globalStyles.missingIcon,
          isOpen ? styles.closeIcon : styles.menuIcon,
          {
            color: menuButtonDown ? "#fff" : iconColor,
          },
        ]}>
        {isOpen ? "×" : "☰"}
      </Text>
    );

    return (
      <View
        style={[
          globalStyles.buttonOuter,
          applyButtonWidth(buttonWidth),
          { borderColor, marginTop: buttonWidth * 0.3 },
          buttonOuterStyle,
        ]}>
        <TouchableWithoutFeedback
          style={[globalStyles.button, buttonTouchableStyle]}
          onPressIn={this.handleItemPressIn(null, this.menuPressAnimation)}
          onPressOut={this.handleItemPressOut(null, this.menuPressAnimation)}
          onPress={this.handleMenuPress}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
          <Animated.View
            style={[
              globalStyles.buttonInner,
              applyButtonWidth(innerWidth),
              { backgroundColor },
              buttonInnerStyle,
            ]}>
            {content}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderDimmer = () => {
    const { isOpen, dimmerStyle } = this.props;
    const { items, dimmerActive } = this.state;

    const fanAnimation = this.itemFanAnimations[0];
    const opacity =
      fanAnimation &&
      fanAnimation.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [0.5, 1.0],
        extrapolate: "clamp",
      });

    return dimmerActive && items.length ? (
      <TouchableWithoutFeedback
        disabled={!isOpen}
        onPress={this.handleMenuPress}>
        <Animated.View
          style={[globalStyles.dimmer, styles.dimmer, { opacity }, dimmerStyle]}
        />
      </TouchableWithoutFeedback>
    ) : null;
  };

  render = () => {
    const {
      position,
      top,
      left,
      right,
      bottom,
      containerStyle,
      itemContainerStyle,
    } = this.props;
    const { buttonWidth } = this.state;

    const [vPos, hPos] = position.split("-");
    const vVal =
      vPos === "top" ? top || 38 : vPos === "bottom" ? bottom || 38 : 38;
    const hVal =
      hPos === "left" ? left || 38 : hPos === "right" ? right || 38 : 38;

    return (
      <View style={[styles.container, containerStyle]} pointerEvents="box-none">
        <View
          style={[
            styles.itemContainer,
            {
              width: buttonWidth,
              minHeight: buttonWidth,
              [vPos]: vVal,
              [hPos]: hVal,
              flexDirection:
                vPos.toLowerCase() === "bottom" ? "column" : "column-reverse",
            },
            itemContainerStyle,
          ]}
          pointerEvents="box-none">
          {this.renderItems()}
          {this.renderMenuButton()}
        </View>
        {this.renderDimmer()}
      </View>
    );
  };
}

// @ts-ignore
FloatingMenu.defaultProps = {
  items: [],
  primaryColor: Colors.primaryColor,
  position: MenuPositions.bottomRight,
  openEase: t => --t * t * t + 1,
  closeEase: t => t * t * t,
  top: 38,
  left: 38,
  right: 38,
  bottom: 38,
  containerStyle: {},
  itemContainerStyle: {},
  buttonOuterStyle: {},
  buttonTouchableStyle: {},
  buttonInnerStyle: {},
};
