
<div align="center">
  <h1>react-native-floating-action-menu</h1>
  
  <div>B-Y-O-I (bring your own icon) javascript component for react-native. No dependencies. Inspired by material-design's Floating Action Button. Please customize to your needs and enjoy. PRs are welcome!</div>
  
  <br/>

  <img src="example/src/assets/readme-0.gif" alt="Floating Action Menu demo" height="480" />
</div>

## Installation

```
npm install --save react-native-floating-action-menu
```

## Usage

```js
import { FloatingMenu } from 'react-native-floating-action-menu';

<FloatingMenu
  items={items}
  isOpen={this.state.isMenuOpen}
  onMenuToggle={this.handleMenuPress}
  onItemPress={this.handleItemPress}
/>
```

## Item Config

*FloatingItem*

Prop | description | type | required
--- | --- | --- | ---
label | text to display alongside button | string | ✔︎
labelStyle | style for the Text element | object | 
isPending | will display ActivityIndicator in place of icon when `isPending` is true | boolean | 
isDisabled | will disable the item when `isDisabled` is true | boolean | 

Example:

```js
{
  label: 'Hello world',
  isPending: false,
  isDisabled: false,
  onPress: (item, index) => {}, // (optional, can also be handled via `onItemPress`)
  // Anything else you want goes here
}
```

## Menu Config

Prop | description | type | default 
--- | --- | --- | ---
items | array of `Item`s (See above). Items are positioned by their order in this array and start closest to the menu button. | FloatingItem[] | []
isOpen | control the menu open/closed state | boolean | false
position | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | string | 'bottom-right'
primaryColor | hex color string | string | '#213A77'
buttonWidth | width (and also height) of the button | number | 50
dimmerStyle | style the background dimmer element | object | -
renderMenuIcon | a function used to render the icon for menu button. Receives current menu state as an argument. (see below example) | function | -
renderItemIcon | a function used to render the icon for the items. Receives item, index, and current menu state as arguments. (see below example) | function | -
onMenuToggle | callback function called when the menu has been toggled open or closed | function | -
onItemPress | callback function called when a menu item has been pressed. If an item specifies its own `onPress` function, it will take priority, and this function will be ignored. | function | -

## Gif Demos

<table>
<thead />
<tbody>
<tr>
  <td width="25%">
    <p><b>Positions</b></p>
    <img src="example/src/assets/readme-2.gif" alt="Positions" height="auto" style="max-width: 100%;" />
  </td>
  <td width="25%">
    <p><b>FontAwesome</b></p>
    <img src="example/src/assets/readme-3.gif" alt="Positions" height="auto" style="max-width: 100%;" />
  </td>
  <td width="25%">
    <p><b>Colors</b></p>
    <img src="example/src/assets/readme-4.gif" alt="Positions" height="auto" style="max-width: 100%;" />
  </td>
  <td width="25%">
    <p><b>List lengths</b></p>
    <img src="example/src/assets/readme-5.gif" alt="Positions" height="auto" style="max-width: 100%;" />
  </td>
</tr>
</tbody>
</table>

## Quick Start Example

```js
import React from 'react';
import { StyleSheet } from 'react-native';
import { FloatingMenu } from 'react-native-floating-action-menu';

class Example extends React.Component {
  state = {
    isMenuOpen: false,
  };

  handleMenuPress = val =>
    this.setState({isMenuOpen: !this.state.isMenuOpen});
  handleItemPress = (item, index) =>
    console.log('pressed item', item);

  render() {
    const items = [
      { label: 'Do a little dance' },
      { label: 'Make a lil love' },
      { label: 'Get down tonight' },
    ];

    return (
      <View style={styles.container}>
        <FloatingMenu
          isOpen={this.state.isMenuOpen}
          items={items}
          onMenuToggle={this.handleMenuPress}
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

## Example rendering icons (FontAwesome, regular Images)

```
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const items = [
  { label: 'First is an icon', icon: faUserPlus }, // FontAwesome Icon
  { label: 'Second is an image', image: require('../assets/img-0.png') }, // Image
];

...

<FloatingMenu
  
  ...

  renderItemIcon={(item, index, menuState) => {
    const { primaryColor } = this.state;
    const { itemsDown, dimmerActive } = menuState;

    // Icons can be rendered however you like.
    // Here are some examples, using data from the item object:

    if (item.icon) {
      return (
        <FontAwesomeIcon
          icon={item.icon}
          size={25}
          color={itemsDown[index] ? '#fff' : primaryColor}
        />
      );
    }
    else if (item.image) {
      return (
        <Image
          source={item.image}
          style={[
            styles.addIcon,
            {tintColor: itemsDown[index] ? '#fff' : primaryColor},
          ]}
          resizeMode="contain"
        />
      );
    }
  }}
/>

```

## Full Example

 - git clone https://github.com/nicotroia/react-native-floating-action-menu
 - cd react-native-floating-action-menu/example
 - npm install
 - npm run ios # or android

## License

MIT © 2019-2020 [Nico Troia](https://nicotroia.com)
