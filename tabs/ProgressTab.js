import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles';

const ProgressTab = ({ isDarkMode }) => {
  return (
    <View style={[globalStyles.container, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
      <Text style={[globalStyles.text, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>
        Dit is Progress Tab
      </Text>
    </View>
  );
};

export default ProgressTab;
