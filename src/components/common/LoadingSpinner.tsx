import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, GlobalStyles } from '../../styles/globalStyles';

const LoadingSpinner = () => {
  return (
    <View style={[GlobalStyles.centered, styles.container]}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoadingSpinner;