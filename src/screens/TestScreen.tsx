// src/screens/TestScreen.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TestScreen = () => (
  <SafeAreaView style={styles.debugContainer}>
  <Text style={styles.debugText}>ContactListScreen is rendering</Text>
</SafeAreaView>
);

const styles = StyleSheet.create({
  debugContainer: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  debugText: {
    color: 'white',
    fontSize: 20,
  },
});

export default TestScreen;