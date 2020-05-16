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
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import {FloatingMenu, globalStyles} from 'react-native-floating-action-menu';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faBars,
  faUserPlus,
  faFileExport,
  faDraftingCompass,
  faAddressBook,
  faBalanceScale,
} from '@fortawesome/free-solid-svg-icons';
// import FloatingMenu from './src/components/FloatingMenu';

const primaryColor = 'red';
const items = [
  // {
  //   label: 'Get down tonight',
  //   icon: faBalanceScale,
  //   iconSize: 28,
  // },
  {
    label: 'Make a lil love',
    icon: faAddressBook,
    iconSize: 28,
  },
  {
    label: 'Do a little dance',
    icon: faDraftingCompass,
    iconSize: 28,
  },
  {
    label: 'Export CSV',
    icon: faFileExport,
    iconSize: 28,
    iconStyle: {marginLeft: 5},
    // isPending: _this.props.exportClientsCSVFetching,
    // isSuccess: !!_this.props.exportClientsCSVSuccess, // boolean
    // isDisabled: !_this.props.clientListJS.length,
  },
  {
    label: 'Add new User',
    icon: faUserPlus,
    iconSize: 28,
  },
];

class App extends React.PureComponent {
  state = {
    example: 0,
    isMenuOpen: false,
  };

  handleMenuToggle = val => {
    this.setState({isMenuOpen: !this.state.isMenuOpen});
  };

  handleItemPress = (item, index) => {
    console.log('pressed', item, index);

    this.setState({isMenuOpen: false});
  };

  handleToggleExample = () => {
    this.setState({example: this.state.example === 0 ? 1 : 0});
  };

  renderMenuIcon = menuState => {
    const {isMenuOpen} = this.state;
    const {menuButtonDown} = menuState;

    return (
      <FontAwesomeIcon
        color={menuButtonDown ? '#fff' : primaryColor}
        icon={isMenuOpen ? faTimes : faBars}
        size={25}
      />
    );
  };

  renderItemIcon = itemState => {
    // const { isMenuOpen } = this.state;
    const {item, index, itemsDown, dimmerActive} = itemState;

    console.log('renderItemIcon', itemState);

    return (
      <FontAwesomeIcon
        style={[
          styles.itemIcon,
          {color: itemsDown[index] ? '#fff' : primaryColor},
        ]}
        icon={item.icon}
        size={25}
      />
    );
  };

  render() {
    const {example, isMenuOpen} = this.state;

    const isFa = example === 1;

    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            contentContainerStyle={styles.content}>
            <Header />
            <Text style={styles.h1}>🙋‍♂️</Text>
            <Text style={[styles.h2, {textAlign: 'center'}]}>
              This is the react-native-floating-action-menu demo
            </Text>

            <View style={{marginTop: 30}}>
              <TouchableOpacity onPress={this.handleToggleExample}>
                <Text style={[globalStyles.text, globalStyles.link]}>
                  {!isFa ? 'FontAwesome example' : 'Default example'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <FloatingMenu
            isOpen={isMenuOpen}
            items={items}
            primaryColor={primaryColor}
            renderMenuIcon={isFa ? this.renderMenuIcon : null}
            renderItemIcon={isFa ? this.renderItemIcon : null}
            onMenuPress={this.handleMenuToggle}
            onItemPress={this.handleItemPress}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 21,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#0000ff99',
  },
  h1: {
    fontSize: 30,
    letterSpacing: 0.9,
    marginBottom: 30,
    marginTop: 7,
    color: primaryColor,
    textAlign: 'center',
  },
  h2: {
    fontSize: 24,
    letterSpacing: 0.8,
    marginBottom: 21,
    marginTop: 4,
    color: '#4A6CB4',
  },
});

export default App;
