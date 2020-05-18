
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import { ImageBackground, StyleSheet, Text } from 'react-native';
import { constants } from 'react-native-floating-action-menu';
import React from 'react';

const Header = () => {
  return (
    <ImageBackground
      accessibilityRole="image"
      source={require('../../assets/logo.png')}
      style={styles.background}
      imageStyle={styles.logo}
    >
      <Text style={[styles.emoji, { marginBottom: 0 }]}>🙋‍♂️</Text>
      <Text style={[styles.h1, { marginBottom: 21 }]}>
        react-native-floating-action-menu
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: 30,
    paddingTop: 64,
    paddingHorizontal: 32,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: -128,
    marginBottom: -192,
  },
  emoji: {
    fontSize: 30,
    textAlign: 'center',
  },
  h1: {
    fontSize: 28,
    letterSpacing: 0.8,
    marginTop: 4,
    textAlign: 'center',
    color: constants.Colors.primaryColor,
  },
});

export default Header;
