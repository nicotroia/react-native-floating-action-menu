import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  GestureResponderEvent,
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
import { globalStyles } from "@/styles";

export type RenderState = {
  dimmerActive: boolean;
  menuButtonDown: boolean;
  itemsDown: Record<number, boolean>;
  items: ItemConfig[];
  buttonWidth: number;
  innerWidth: number;
};

export type FloatingMenuProps = {
  items: ItemConfig[];
  buttonWidth?: number;
  innerWidth?: number;
  isOpen: boolean;
  onItemPress?: (item: ItemConfig, index: number) => void;
  position?: Position;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  containerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  onMenuToggle?: (open: boolean) => void;
  openEase?: (t: number) => number;
  closeEase?: (t: number) => number;
  backgroundUpColor?: string;
  backgroundDownColor?: string;
  borderColor?: string;
  iconColor?: string;
  primaryColor?: string;
  buttonOuterStyle?: StyleProp<ViewStyle>;
  buttonTouchableStyle?: StyleProp<ViewStyle>;
  buttonInnerStyle?: StyleProp<ViewStyle>;
  dimmerStyle?: StyleProp<ViewStyle>;
  renderMenuIcon?: (props: RenderState) => React.ReactNode;
  renderItemIcon?: (
    item: ItemConfig,
    index: number,
    props: RenderState
  ) => React.ReactNode;
  /** Accessible label for the button when the menu is closed. Default: "Open menu" */
  menuOpenLabel?: string;
  /** Accessible label for the button when the menu is open. Default: "Close menu" */
  menuCloseLabel?: string;
  /** Called when the button is pressed and there are no items — use this to make the FAB a standalone button */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Render prop that replaces the default View wrapping the FAB button and
   * its items. Use this to position the menu with an external animation
   * library such as Reanimated:
   *
   *   renderButtonContainer={(children, style) => (
   *     <Animated.View style={[style, animatedStyle]} pointerEvents="box-none">
   *       {children}
   *     </Animated.View>
   *   )}
   *
   * The default position/size styles are passed as `style` so you can merge
   * or ignore them as needed. Remember to forward `pointerEvents="box-none"`
   * so touches pass through to the button.
   */
  renderButtonContainer?: (
    children: React.ReactNode,
    style: StyleProp<ViewStyle>
  ) => React.ReactElement;
};

const OpenEase = (t: number) => {
  const s = t - 1;
  return s * s * s + 1;
};
const CloseEase = (t: number) => t * t * t;

export const FloatingMenuComponent: React.FC<FloatingMenuProps> = ({
  items,
  buttonWidth: buttonWidthProp,
  innerWidth: innerWidthProp,
  isOpen,
  onItemPress,
  position = MenuPositions.bottomRight as Position,
  top = 38,
  left = 38,
  right = 38,
  bottom = 38,
  containerStyle,
  itemContainerStyle,
  onMenuToggle,
  openEase = OpenEase,
  closeEase = CloseEase,
  backgroundUpColor,
  backgroundDownColor,
  borderColor: borderColorProp,
  iconColor: iconColorProp,
  primaryColor = Colors.primaryColor,
  buttonOuterStyle,
  buttonTouchableStyle,
  buttonInnerStyle,
  dimmerStyle,
  renderMenuIcon,
  renderItemIcon,
  renderButtonContainer,
  menuOpenLabel = "Open menu",
  menuCloseLabel = "Close menu",
  onPress,
}) => {
  const [dimmerActive, setDimmerActive] = useState(false);
  const [menuButtonDown, setMenuButtonDown] = useState(false);
  const [itemsDown, setItemsDown] = useState<Record<number, boolean>>({});

  const buttonWidth = buttonWidthProp ?? getButtonWidth();
  const innerWidth = innerWidthProp ?? buttonWidth * 0.8;
  const reversedItems = useMemo(() => [...items].reverse(), [items]);

  const menuPressAnimation = useRef(new Animated.Value(0));
  const itemPressAnimations = useRef<Record<number, Animated.Value>>({});
  const itemFanAnimations = useRef<Record<number, Animated.Value>>({});
  const dimmerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    for (let i = 0; i < reversedItems.length; i++) {
      if (!itemPressAnimations.current[i]) {
        itemPressAnimations.current[i] = new Animated.Value(0);
      }
      if (!itemFanAnimations.current[i]) {
        itemFanAnimations.current[i] = new Animated.Value(0);
      }
    }
  }, [reversedItems.length]);

  const toggleMenu = useCallback(
    (open: boolean) => {
      const numItems = reversedItems.length;
      if (numItems === 0) return;
      const options = {
        toValue: open ? 1.0 : 0.0,
        duration: 142 - Math.max(numItems - 2, 0) * 5,
        tension: 30,
        friction: 5,
        useNativeDriver: true,
      };

      let totalDelay = 0;
      for (let i = 0; i < numItems; i++) {
        const t = (open ? i : numItems - i - 1) / numItems;
        const ease = open ? openEase(t) : closeEase(t);
        const time = (150 / Math.min(Math.max(numItems, 0), 8)) * i + 160;
        const delay = Math.max(Math.min(time * ease, 300), 0);
        totalDelay = delay + time;

        Animated.delay(delay).start(() => {
          Animated.spring(itemFanAnimations.current[i], options).start();
        });
      }

      if (dimmerTimeoutRef.current) clearTimeout(dimmerTimeoutRef.current);
      if (open) {
        setDimmerActive(true);
      } else {
        dimmerTimeoutRef.current = setTimeout(() => {
          setDimmerActive(false);
        }, totalDelay);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reversedItems.length, openEase, closeEase]
  );

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    toggleMenu(isOpen);
  }, [isOpen, toggleMenu]);

  const handleItemPressIn = useCallback(
    (
      index: number | null,
      animatedValue: Animated.Value,
      useNativeDriver = false
    ) =>
      () => {
        Animated.timing(animatedValue, {
          toValue: 1.0,
          duration: 14,
          useNativeDriver,
        }).start();
        if (index === null) {
          setMenuButtonDown(true);
        } else {
          setItemsDown(prev => ({ ...prev, [index]: true }));
        }
      },
    []
  );

  const handleItemPressOut = useCallback(
    (
      index: number | null,
      animatedValue: Animated.Value,
      useNativeDriver = false
    ) =>
      () => {
        Animated.timing(animatedValue, {
          toValue: 0.0,
          duration: 142,
          useNativeDriver,
        }).start();
        if (index === null) {
          setMenuButtonDown(false);
        } else {
          setItemsDown(prev => ({ ...prev, [index]: false }));
        }
      },
    []
  );

  const handleItemPress = useCallback(
    (index: number) => (event: GestureResponderEvent) => {
      const item = reversedItems[index];
      if (!item) return;
      if (item.onPress) {
        item.onPress(event, index);
      } else {
        onItemPress?.(item, index);
      }
    },
    [reversedItems, onItemPress]
  );

  const handleMenuPress = useCallback((event: GestureResponderEvent) => {
    if (reversedItems.length === 0) {
      onPress?.(event);
    } else {
      onMenuToggle?.(!isOpen);
    }
  }, [isOpen, onMenuToggle, onPress, reversedItems.length]);

  const renderState: RenderState = {
    dimmerActive,
    menuButtonDown,
    itemsDown,
    items: reversedItems,
    buttonWidth,
    innerWidth,
  };

  const itemElements = dimmerActive
    ? reversedItems.map((item, index) => {
        if (!item) return null;
        return (
          <FloatingItem
            key={`item-${index}`}
            {...item}
            item={item}
            index={index}
            icon={
              renderItemIcon ? renderItemIcon(item, index, renderState) : null
            }
            position={position}
            isOpen={isOpen || dimmerActive}
            backgroundUpColor={backgroundUpColor}
            backgroundDownColor={backgroundDownColor}
            borderColor={borderColorProp}
            iconColor={iconColorProp}
            primaryColor={primaryColor || "#475aff"}
            buttonWidth={buttonWidth}
            innerWidth={innerWidth}
            numItems={reversedItems.length}
            itemsDown={itemsDown}
            itemFanAnimations={itemFanAnimations.current}
            itemPressAnimations={itemPressAnimations.current}
            onPress={handleItemPress(index)}
            onPressIn={handleItemPressIn(
              index,
              itemPressAnimations.current[index]
            )}
            onPressOut={handleItemPressOut(
              index,
              itemPressAnimations.current[index]
            )}
          />
        );
      })
    : null;

  const iconColor = iconColorProp || primaryColor;
  const borderColor = borderColorProp || primaryColor;
  const menuBgColor = menuPressAnimation.current.interpolate({
    inputRange: [0.0, 1.0],
    outputRange: [
      backgroundUpColor || "#ffffff",
      backgroundDownColor || primaryColor || "#475aff",
    ],
  });

  const hasItems = reversedItems.length > 0;

  const menuContent = renderMenuIcon ? (
    renderMenuIcon(renderState)
  ) : (
    <Text
      accessible={false}
      style={[
        globalStyles.missingIcon,
        hasItems && isOpen ? styles.closeIcon : styles.menuIcon,
        { color: menuButtonDown ? "#fff" : iconColor },
      ]}>
      {hasItems && isOpen ? "×" : "☰"}
    </Text>
  );

  const menuButton = (
    <View
      style={[
        globalStyles.buttonOuter,
        applyButtonWidth(buttonWidth),
        { borderColor, marginTop: buttonWidth * 0.3 },
        buttonOuterStyle,
      ]}>
      <TouchableWithoutFeedback
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={hasItems && isOpen ? menuCloseLabel : menuOpenLabel}
        accessibilityState={hasItems ? { expanded: isOpen } : undefined}
        style={[globalStyles.button, buttonTouchableStyle]}
        onPressIn={handleItemPressIn(null, menuPressAnimation.current)}
        onPressOut={handleItemPressOut(null, menuPressAnimation.current)}
        onPress={handleMenuPress}
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
        <Animated.View
          style={[
            globalStyles.buttonInner,
            applyButtonWidth(innerWidth),
            { backgroundColor: menuBgColor },
            buttonInnerStyle,
          ]}>
          {menuContent}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );

  const fanAnimation0 = itemFanAnimations.current[0];
  const dimmerOpacity = fanAnimation0?.interpolate({
    inputRange: [0.0, 1.0],
    outputRange: [0.5, 1.0],
    extrapolate: "clamp",
  });

  const dimmer =
    dimmerActive && reversedItems.length ? (
      <TouchableWithoutFeedback
        accessible={false}
        disabled={!isOpen}
        onPress={handleMenuPress}>
        <Animated.View
          style={[
            globalStyles.dimmer,
            styles.dimmer,
            { opacity: dimmerOpacity },
            dimmerStyle,
          ]}
        />
      </TouchableWithoutFeedback>
    ) : null;

  const [vPos, hPos] = position.split("-");
  const vVal = vPos === "top" ? top : bottom;
  const hVal = hPos === "left" ? left : right;

  const buttonContainerStyle: StyleProp<ViewStyle> = [
    styles.itemContainer,
    {
      width: buttonWidth,
      minHeight: buttonWidth,
      [vPos]: vVal,
      [hPos]: hVal,
      flexDirection: vPos === "bottom" ? "column" : "column-reverse",
    } as ViewStyle,
    itemContainerStyle,
  ];

  const buttonContainerChildren = (
    <>
      {itemElements}
      {menuButton}
    </>
  );

  return (
    <View
      style={[styles.container, containerStyle]}
      pointerEvents="box-none"
      accessibilityViewIsModal={dimmerActive && hasItems}>
      {renderButtonContainer ? (
        renderButtonContainer(buttonContainerChildren, buttonContainerStyle)
      ) : (
        <View style={buttonContainerStyle} pointerEvents="box-none">
          {buttonContainerChildren}
        </View>
      )}
      {dimmer}
    </View>
  );
};

export const FloatingMenu = React.memo(FloatingMenuComponent);
