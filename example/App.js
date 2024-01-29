/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faBars,
  faUserPlus,
  faFileExport,
  faBabyCarriage,
  faArrowDown,
  faAmbulance,
} from '@fortawesome/free-solid-svg-icons';
import {
  FloatingMenu,
  globalStyles,
  constants,
} from 'react-native-floating-action-menu';
import tinycolor from 'tinycolor2';

import Label from './components/Label';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import NumberStepper from './components/NumberStepper';

import styles from './App.styles';

const COLOR_OPTIONS = ['#F53B57', '#3D40C6', '#10BCF9', '#00D8D6', '#04C56B'];
const MENU_ITEMS = [
  {
    label: 'Add new User',
    icon: faUserPlus,
  },
  {
    label: 'Export CSV',
    icon: faFileExport,
    style: {marginLeft: 5},
    labelStyle: {width: 150},
    isDisabled: true,
  },
  {
    label: 'Do a little dance',
    image: require('./assets/icon-2.png'),
  },
  {
    label: 'Make a lil love',
    icon: faBabyCarriage,
  },
  {
    label: 'Get down tonight',
    icon: faArrowDown,
  },
  {
    label: 'Work it harder',
    image: require('./assets/icon-0.png'),
  },
  {
    label: 'Make it better',
    icon: faAmbulance,
  },
  {
    label: 'Do it faster',
    image: require('./assets/icon-1.png'),
  },
];
const EASING_OPTIONS = [
  {label: 'linear', value: 0, fn: t => t},
  {label: 'easeInQuad', value: 1, fn: t => t * t},
  {label: 'easeOutQuad', value: 2, fn: t => t * (2 - t)},
  {
    label: 'easeInOutQuad',
    value: 3,
    fn: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  },
  {label: 'easeInCubic', value: 4, fn: t => t * t * t},
  {label: 'easeOutCubic', value: 5, fn: t => --t * t * t + 1},
  {
    label: 'easeInOutCubic',
    value: 6,
    fn: t =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  },
  {label: 'easeInQuart', value: 7, fn: t => t * t * t * t},
  {label: 'easeOutQuart', value: 8, fn: t => 1 - --t * t * t * t},
  {
    label: 'easeInOutQuart',
    value: 9,
    fn: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  },
  {label: 'easeInQuint', value: 10, fn: t => t * t * t * t * t},
  {label: 'easeOutQuint', value: 11, fn: t => 1 + --t * t * t * t * t},
  {
    label: 'easeInOutQuint',
    value: 12,
    fn: t => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t),
  },
];

class App extends React.PureComponent {
  state = {
    noIcons: false,
    isMenuOpen: false,
    numItemsToShow: 3,
    activeColor: COLOR_OPTIONS[0],
    activeOpenEase: EASING_OPTIONS[5].value,
    activeCloseEase: EASING_OPTIONS[4].value,
    activePosition: constants.MenuPositions.bottomRight,
    itemsPending: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {numItemsToShow, itemsPending} = prevState;

    let itemsToShow =
      numItemsToShow > 0 ? MENU_ITEMS.slice(0, numItemsToShow) : [];
    for (let i = 0; i < itemsToShow.length; i++) {
      const item = itemsToShow[i];

      itemsToShow[i] = {
        ...item,
        isPending: itemsPending[itemsToShow.length - i - 1],
      };
    }

    return {
      ...prevState,
      itemsToShow,
    };
  }

  handleMenuToggle = () => {
    this.setState({isMenuOpen: !this.state.isMenuOpen});
  };

  handleItemPress = (item, index) => {
    this.setState({
      itemsPending: {
        ...this.state.itemsPending,
        [index]: true,
      },
    });

    // Simulate an async pending state
    setTimeout(
      () =>
        this.setState(
          {
            itemsPending: {
              ...this.state.itemsPending,
              [index]: false,
            },
          },
          () => {
            setTimeout(() => this.setState({isMenuOpen: false}), 80);
          }
        ),
      Math.random() * 300 + 300
    );
  };

  handleToggleExample = () => this.setState({noIcons: !this.state.noIcons});
  handleStepChange = numItemsToShow => this.setState({numItemsToShow});
  handleColorChange = activeColor => () => this.setState({activeColor});
  handlePositionChange = activePosition => () =>
    this.setState({activePosition});
  handleEaseChange = index => (value, i, data) => {
    this.setState({[index]: data[i]});
  };

  renderMenuIcon = menuState => {
    const {isMenuOpen, activeColor} = this.state;
    const {menuButtonDown} = menuState;

    return (
      <FontAwesomeIcon
        color={menuButtonDown ? '#fff' : activeColor}
        icon={isMenuOpen ? faTimes : faBars}
        size={23}
      />
    );
  };

  renderItemIcon = (item, index, menuState) => {
    const {activeColor} = this.state;
    const {itemsDown} = menuState;

    if (!item.icon && !item.image) {
      return <Text style={globalStyles.text}>?</Text>;
    }

    return item.icon ? (
      <FontAwesomeIcon
        style={[{color: itemsDown[index] ? '#fff' : activeColor}, item.style]}
        icon={item.icon}
        size={25}
      />
    ) : (
      <Image
        source={item.image}
        style={[
          styles.addIcon,
          {tintColor: itemsDown[index] ? '#fff' : activeColor},
        ]}
        resizeMode="contain"
      />
    );
  };

  renderPositionOption = (position, index) => {
    const {activePosition} = this.state;

    const isActive = position === activePosition;

    return (
      <TouchableOpacity
        key={position}
        onPress={this.handlePositionChange(position)}>
        <Text
          style={[
            globalStyles.text,
            globalStyles.link,
            styles.positionOption,
            isActive && styles.positionActive,
          ]}>
          {position}
        </Text>
      </TouchableOpacity>
    );
  };

  renderPositionOptions = () => {
    return (
      <View style={styles.positionOptionsContainer}>
        <Label active label="Position" style={{marginBottom: 7}} />
        <View style={styles.positionOptionsInner}>
          {Object.values(constants.MenuPositions).map(
            this.renderPositionOption
          )}
        </View>
      </View>
    );
  };

  renderExampleOption = () => {
    const {noIcons} = this.state;

    return (
      <View style={{marginBottom: 21}}>
        <Label active label="Icon type" style={{marginBottom: 7}} />
        <TouchableOpacity onPress={this.handleToggleExample}>
          <Text style={[globalStyles.text, globalStyles.link]}>
            {noIcons ? 'Default (no icons)' : 'w/ FontAwesome Icons'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderNumberStepper = () => {
    const {numItemsToShow} = this.state;

    return (
      <View style={styles.numberStepperContainer}>
        <Label active label="Number of items" style={{marginBottom: 7}} />
        <NumberStepper
          value={numItemsToShow}
          onChange={this.handleStepChange}
          min={0}
          max={8}
        />
      </View>
    );
  };

  renderColorOption = color => {
    const {activeColor} = this.state;

    const tinyC = tinycolor(color);
    const backgroundColor = tinyC.toHexString();
    const borderColor = tinyC
      .clone()
      .desaturate(10)
      .toHexString();
    const size = 42;

    const textColor = tinycolor
      .mostReadable(color, [constants.Colors.readableBlack, '#fff'])
      .toHexString();
    const check = (
      <Text style={{color: textColor, fontSize: 18}} adjustsFontSizeToFit>
        ✔︎
      </Text>
    );

    return (
      <TouchableOpacity key={color} onPress={this.handleColorChange(color)}>
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
          {color && color.toLowerCase() === activeColor.toLowerCase()
            ? check
            : null}
        </View>
      </TouchableOpacity>
    );
  };

  renderColorOptions = () => {
    return (
      <View style={styles.colorOptionsContainer}>
        <Label active label="Primary color" style={{marginBottom: 7}} />
        <View style={styles.colorOptionsInner}>
          {COLOR_OPTIONS.map(this.renderColorOption)}
        </View>
      </View>
    );
  };

  renderEasingOptions = () => {
    const {activeOpenEase, activeCloseEase} = this.state;

    return (
      <View style={styles.easingOptionsContainer}>
        <Label active label="Open Ease" style={{marginBottom: 7}} />
        <Dropdown
          data={EASING_OPTIONS}
          value={activeOpenEase}
          isOptional
          onChangeText={this.handleEaseChange('activeOpenEase')}
        />
        <Label active label="Close Ease" style={{marginBottom: 7}} />
        <Dropdown
          data={EASING_OPTIONS}
          value={activeCloseEase}
          isOptional
          onChangeText={this.handleEaseChange('activeCloseEase')}
        />
      </View>
    );
  };

  render() {
    const {
      noIcons,
      isMenuOpen,
      activePosition,
      activeColor,
      itemsToShow,
      activeOpenEase,
      activeCloseEase,
    } = this.state;

    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            contentContainerStyle={styles.content}>
            <Header />

            {this.renderPositionOptions()}
            {this.renderExampleOption()}
            {this.renderNumberStepper()}
            {this.renderColorOptions()}
            {this.renderEasingOptions()}
          </ScrollView>

          <FloatingMenu
            isOpen={itemsToShow.length && isMenuOpen}
            items={itemsToShow}
            position={activePosition}
            primaryColor={activeColor}
            renderMenuIcon={!noIcons ? this.renderMenuIcon : null}
            renderItemIcon={!noIcons ? this.renderItemIcon : null}
            onMenuToggle={this.handleMenuToggle}
            onItemPress={this.handleItemPress}
            openEase={activeOpenEase.fn}
            closeEase={activeCloseEase.fn}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
