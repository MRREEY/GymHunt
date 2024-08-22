import React, { useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native'; // Import StatusBar

import HomeTab from './tabs/HomeTab';
import WorkoutsTab from './tabs/WorkoutsTab';
import ProgressTab from './tabs/ProgressTab';
import MapTab from './tabs/MapTab.js';
import SettingsTab from './tabs/SettingsTab';

import { Ionicons } from '@expo/vector-icons'; // Iconen voor de tabs

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Haal de opgeslagen modus 1x op bij het opstarten van de app
    const loadMode = async () => {
      const savedMode = await AsyncStorage.getItem('darkMode');
      if (savedMode !== null) {
        setIsDarkMode(JSON.parse(savedMode));
      }
    };
    loadMode();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />
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
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
          tabBarInactiveTintColor: isDarkMode ? '#888' : '#888',
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#000' : '#fff',
          },
        })}
      >
        <Tab.Screen name="Home">
          {props => <HomeTab {...props} isDarkMode={isDarkMode} />}
        </Tab.Screen>
        <Tab.Screen name="Workouts" component={WorkoutsTab} />
        <Tab.Screen name="Map" component={MapTab} />
        <Tab.Screen name="Progress">
          {props => <ProgressTab {...props} isDarkMode={isDarkMode} />}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {props => <SettingsTab {...props} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
