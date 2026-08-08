import React, { useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faBars,
  faUserPlus,
  faFileExport,
  faBabyCarriage,
  faArrowDown,
  faTruckMedical,
} from '@fortawesome/free-solid-svg-icons';
import { Picker } from '@react-native-picker/picker';
import {
  FloatingMenu,
  globalStyles,
  constants,
} from 'react-native-floating-action-menu';
import tinycolor from 'tinycolor2';

import Label from './components/Label';
import Header from './components/Header';
import NumberStepper from './components/NumberStepper';

import styles from './App.styles';

const COLOR_OPTIONS = ['#F53B57', '#3D40C6', '#10BCF9', '#00D8D6', '#04C56B'];

const MENU_ITEMS = [
  { label: 'Add new User', icon: faUserPlus },
  {
    label: 'Export CSV',
    icon: faFileExport,
    style: { marginLeft: 5 },
    labelStyle: { width: 150 },
    isDisabled: true,
  },
  { label: 'Do a little dance', image: require('./assets/icon-2.png') },
  { label: 'Make a lil love', icon: faBabyCarriage },
  { label: 'Get down tonight', icon: faArrowDown },
  { label: 'Work it harder', image: require('./assets/icon-0.png') },
  { label: 'Make it better', icon: faTruckMedical },
  { label: 'Do it faster', image: require('./assets/icon-1.png') },
];

const EASING_OPTIONS = [
  { label: 'linear', value: 0, fn: t => t },
  { label: 'easeInQuad', value: 1, fn: t => t * t },
  { label: 'easeOutQuad', value: 2, fn: t => t * (2 - t) },
  { label: 'easeInOutQuad', value: 3, fn: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t) },
  { label: 'easeInCubic', value: 4, fn: t => t * t * t },
  { label: 'easeOutCubic', value: 5, fn: t => { const s = t - 1; return s * s * s + 1; } },
  { label: 'easeInOutCubic', value: 6, fn: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
  { label: 'easeInQuart', value: 7, fn: t => t * t * t * t },
  { label: 'easeOutQuart', value: 8, fn: t => { const s = t - 1; return 1 - s * s * s * s; } },
  { label: 'easeInOutQuart', value: 9, fn: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (t - 1) * (t - 1) * (t - 1) * (t - 1) },
  { label: 'easeInQuint', value: 10, fn: t => t * t * t * t * t },
  { label: 'easeOutQuint', value: 11, fn: t => { const s = t - 1; return 1 + s * s * s * s * s; } },
  { label: 'easeInOutQuint', value: 12, fn: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) },
];

export default function App() {
  const [noIcons, setNoIcons] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [numItemsToShow, setNumItemsToShow] = useState(3);
  const [activeColor, setActiveColor] = useState(COLOR_OPTIONS[0]);
  const [activeOpenEase, setActiveOpenEase] = useState(EASING_OPTIONS[5]);
  const [activeCloseEase, setActiveCloseEase] = useState(EASING_OPTIONS[4]);
  const [activePosition, setActivePosition] = useState(constants.MenuPositions.bottomRight);
  const [itemsPending, setItemsPending] = useState({});

  const itemsToShow = useMemo(() => {
    const items = numItemsToShow > 0 ? MENU_ITEMS.slice(0, numItemsToShow) : [];
    return items.map((item, i) => ({
      ...item,
      isPending: itemsPending[items.length - i - 1],
    }));
  }, [numItemsToShow, itemsPending]);

  const handleItemPress = useCallback((item, index) => {
    setItemsPending(prev => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setItemsPending(prev => ({ ...prev, [index]: false }));
      setTimeout(() => setIsMenuOpen(false), 80);
    }, Math.random() * 300 + 300);
  }, []);

  const renderMenuIcon = useCallback(({ menuButtonDown }) => (
    <FontAwesomeIcon
      color={menuButtonDown ? '#fff' : activeColor}
      icon={isMenuOpen ? faTimes : faBars}
      size={23}
    />
  ), [isMenuOpen, activeColor]);

  const renderItemIcon = useCallback((item, index, { itemsDown }) => {
    if (!item.icon && !item.image) {
      return <Text style={globalStyles.text}>?</Text>;
    }
    const color = itemsDown[index] ? '#fff' : activeColor;
    return item.icon ? (
      <FontAwesomeIcon
        style={[{ color }, item.style]}
        icon={item.icon}
        size={25}
      />
    ) : (
      <Image
        source={item.image}
        style={[styles.addIcon, { tintColor: color }]}
        resizeMode="contain"
      />
    );
  }, [activeColor]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}>
          <Header />

          <View style={styles.positionOptionsContainer}>
            <Label active label="Position" style={{ marginBottom: 7 }} />
            <View style={styles.positionOptionsInner}>
              {Object.values(constants.MenuPositions).map(position => (
                <TouchableOpacity
                  key={position}
                  onPress={() => setActivePosition(position)}>
                  <Text
                    style={[
                      globalStyles.text,
                      globalStyles.link,
                      styles.positionOption,
                      position === activePosition && styles.positionActive,
                    ]}>
                    {position}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ marginBottom: 21, width: '100%' }}>
            <Label active label="Icon type" style={{ marginBottom: 7 }} />
            <TouchableOpacity onPress={() => setNoIcons(v => !v)}>
              <Text style={[globalStyles.text, globalStyles.link]}>
                {noIcons ? 'Default (no icons)' : 'w/ FontAwesome Icons'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.numberStepperContainer}>
            <Label active label="Number of items" style={{ marginBottom: 7 }} />
            <NumberStepper
              value={numItemsToShow}
              onChange={setNumItemsToShow}
              min={0}
              max={8}
            />
          </View>

          <View style={styles.colorOptionsContainer}>
            <Label active label="Primary color" style={{ marginBottom: 7 }} />
            <View style={styles.colorOptionsInner}>
              {COLOR_OPTIONS.map(color => {
                const tinyC = tinycolor(color);
                const backgroundColor = tinyC.toHexString();
                const borderColor = tinyC.clone().desaturate(10).toHexString();
                const size = 42;
                const textColor = tinycolor
                  .mostReadable(color, [constants.Colors.readableBlack, '#fff'])
                  .toHexString();
                return (
                  <TouchableOpacity key={color} onPress={() => setActiveColor(color)}>
                    <View
                      style={[
                        styles.swatch,
                        {
                          width: size,
                          height: size,
                          borderWidth: size * 0.15,
                          borderRadius: size / 6,
                          backgroundColor,
                          borderColor,
                        },
                      ]}>
                      {color.toLowerCase() === activeColor.toLowerCase() && (
                        <Text
                          style={{ color: textColor, fontSize: 18 }}
                          adjustsFontSizeToFit>
                          ✔︎
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.easingOptionsContainer}>
            <Label active label="Open Ease" style={{ marginBottom: 7 }} />
            <Picker
              style={styles.picker}
              selectedValue={activeOpenEase.value}
              onValueChange={value =>
                setActiveOpenEase(EASING_OPTIONS.find(e => e.value === value))
              }>
              {EASING_OPTIONS.map(option => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>

            <Label active label="Close Ease" style={{ marginBottom: 7 }} />
            <Picker
              style={styles.picker}
              selectedValue={activeCloseEase.value}
              onValueChange={value =>
                setActiveCloseEase(EASING_OPTIONS.find(e => e.value === value))
              }>
              {EASING_OPTIONS.map(option => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        </ScrollView>

        <FloatingMenu
          isOpen={itemsToShow.length > 0 && isMenuOpen}
          items={itemsToShow}
          position={activePosition}
          primaryColor={activeColor}
          renderMenuIcon={noIcons ? undefined : renderMenuIcon}
          renderItemIcon={noIcons ? undefined : renderItemIcon}
          onMenuToggle={setIsMenuOpen}
          onItemPress={handleItemPress}
          openEase={activeOpenEase.fn}
          closeEase={activeCloseEase.fn}
        />
      </View>
    </SafeAreaView>
  );
}
