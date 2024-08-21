import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles';

const HomeTab = ({ isDarkMode }) => {
  return (
    <View style={[globalStyles.container, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
      <Text style={[globalStyles.text, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>
        Welkom bij Home
      </Text>
    </View>
  );
};

export default HomeTab;
