// src/screens/SplashScreen.js
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* <Image source={} style={styles.logo} /> */}
      <Text style={styles.text}>טוען...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
