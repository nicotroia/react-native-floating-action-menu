# react-native-floating-action-menu

100% javascript component for react-native. No dependencies. Inspired by material-design's Floating Action Button. Please customize to your needs and enjoy. PRs are welcome!

## Installation

```
yarn add react-native-floating-action-menu
```
or
```
npm install react-native-floating-action-menu --save
```

## Usage

```js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

class Example extends React.Component {
  state = {
    isMenuOpen: false,
  };

  handleMenuPress = val =>
    this.setState({isMenuOpen: !this.state.isMenuOpen});
  handleItemPress = (item, index) =>
    console.log('pressed item', item);

  render() {
    let data = [
      { label: 'Do a little dance' },
      { label: 'Make a lil love' },
      { label: 'Get down tonight' },
    ];

    return (
      <View style={styles.container}>
        <FloatingMenu
          isOpen={this.state.isMenuOpen}
          items={items}
          onMenuPress={this.handleMenuPress}
          onItemPress={this.handleItemPress}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});

export default Example;

```

## Item Config

*FloatingItem*

Prop | description | required
--- | --- | ---
label | string | ✔︎
isPending | boolean | 
isDisabled | boolean | 

Example:

```js
{
  label: 'Hello world',
  isPending: false,
  isDisabled: false,
  // Anything else you want goes here
}
```


## Menu Config

Prop | description | type | default 
--- | --- | --- | ---
items | Array of `Item`s. (See above) | FloatingItem[] | []
isOpen | - | - | -
position, | - | - | -
primaryColor, | - | - | -
buttonWidth, | - | - | -
innerWidth, | - | - | -
dimmerStyle, | - | - | -
renderItemIcon, | - | - | -
renderMenuIcon, | - | - | -
onMenuPress | - | - | -
onItemPress | - | - | -

## Example

git clone https://github.com/nicotroia/react-native-floating-action-menu
cd react-native-floating-action-menu/example
npm install
npm run ios # or android

License
MIT © 2019-2020 [Nico Troia](https://nicotroia.com)
