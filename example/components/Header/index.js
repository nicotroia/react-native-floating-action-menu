import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { constants } from 'react-native-floating-action-menu';

export default function Header() {
  return (
    <ImageBackground
      accessibilityRole="image"
      source={require('../../assets/logo.png')}
      style={styles.background}
      imageStyle={styles.logo}>
      <Text style={styles.emoji}>🙋‍♂️</Text>
      <Text style={styles.h1}>react-native-floating-action-menu</Text>
    </ImageBackground>
  );
}

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
