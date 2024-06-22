// MapTab.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dit is Map Tab</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Achtergrondkleur content
  },
  text: {
    color: '#fff', // Tekstkleur wit
    fontSize: 18,
  },
});

export default MapTab;