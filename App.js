// import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import React, { useState } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeTab from './tabs/HomeTab';
import WorkoutsTab from './tabs/WorkoutsTab';
import ProgressTab from './tabs/ProgressTab';
import SettingsTab from './tabs/SettingsTab';

// https://oblador.github.io/react-native-vector-icons/
import { Ionicons } from '@expo/vector-icons'; // Iconen voor de tabs

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Workouts') {
              iconName = focused ? 'barbell' : 'barbell-outline';
            } else if (route.name === 'Progress') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#555',
          inactiveTintColor: '#333',
          style: {
            backgroundColor: '#000',
            height: 50,
          },
          labelStyle: {
            fontSize: 12,
            marginTop: 5,
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Workouts" component={WorkoutsTab} />
        <Tab.Screen name="Progress" component={ProgressTab} />
        <Tab.Screen name="Settings" component={SettingsTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
