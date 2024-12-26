// src/components/AppLayout.js
import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import Navbar from './Navbar';
import { UserContext } from '../contexts/UserContext';

export default function AppLayout({ children, navigation }) {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1E88E5" /> 
      <View style={styles.container}>
        {isAuthenticated && <Navbar navigation={navigation} />}
        <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', 
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flexGrow: 1, 
  },
});
