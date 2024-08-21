import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles';

const SettingsTab = ({ toggleTheme, isDarkMode }) => {
  return (
    <SafeAreaView style={[globalStyles.container, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
      {/* Tekst die de huidige modus aangeeft */}
      <Text style={[globalStyles.text, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>
        Darkmode
      </Text>
      {/* Toggle button voor het wisselen van thema */}
      <TouchableOpacity 
        style={[globalStyles.button, isDarkMode ? globalStyles.darkButton : globalStyles.lightButton]}
        onPress={toggleTheme}
      >
        <Text style={[globalStyles.buttonText, isDarkMode ? globalStyles.darkButtonText : globalStyles.lightButtonText]}>
          {isDarkMode ? 'Schakel naar Light Mode' : 'Schakel naar Dark Mode'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingsTab;
