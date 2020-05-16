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
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
// import { FloatingMenu } from 'react-native-floating-action-menu';
// import FloatingMenu from './src/components/FloatingMenu';

const getItems = _this => [
  // {
  //   label: 'Get down tonight',
  //   icon: '', // faUserPlus,
  //   iconSize: 28,
  // },
  // {
  //   label: 'Make a lil love',
  //   icon: '', // faUserPlus,
  //   iconSize: 28,
  // },
  {
    label: 'Do a little dance',
    icon: '', // faUserPlus,
    iconSize: 28,
  },
  {
    label: 'Export CSV',
    icon: '', // faFileExport,
    iconSize: 28,
    iconStyle: { marginLeft: 5 },
    // isPending: _this.props.exportClientsCSVFetching,
    // isSuccess: !!_this.props.exportClientsCSVSuccess, // boolean
    // isDisabled: !_this.props.clientListJS.length,
  },
  {
    label: 'Add new Client',
    icon: '', // faUserPlus,
    iconSize: 28,
  },
];

class App extends React.PureComponent {
  state = {
    isMenuOpen: false,
  };
  
  handleMenuToggle = val => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  handleItemPress = (item, index) => {
    console.log('pressed', item, index);

    this.setState({ isMenuOpen: false });
  }

  render() {
    const { isMenuOpen } = this.state;

    const items = getItems(this);
  
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            contentContainerStyle={styles.content}
          >
            <Header />
            <Text>hello world</Text>
          </ScrollView>

          <FloatingMenu
            isOpen={isMenuOpen}
            items={items}
            onMenuPress={this.handleMenuToggle}
            onItemPress={this.handleItemPress}
          />
        </View>
      </SafeAreaView>
    );
  }
};

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
    // padding: 14,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#0000ff99',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
