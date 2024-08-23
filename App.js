import React, { useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native'; // Import StatusBar

import HomeTab from './tabs/HomeTab';
import WorkoutsTab from './tabs/WorkoutsTab';
import MapTab from './tabs/MapTab.js';
import SettingsTab from './tabs/SettingsTab';

import { Ionicons } from '@expo/vector-icons'; // Iconen voor de tabs

const Tab = createBottomTabNavigator(); //Aanmaak bottom navigator

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

  // Functie switchen thema
  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // Opslaan nieuwe modus in AsynchStorage voor vervolg sessie
    await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  //statusbar op basis van modus
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />
      <Tab.Navigator
        screenOptions={({ route }) => 
          ({
            //Iconen instellen op basis van de naam route
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Workouts') {
              iconName = focused ? 'barbell' : 'barbell-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            //return Ionicon met naam en stijl
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          //Instellingen actief en inactief kleur van tabbar
          tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
          tabBarInactiveTintColor: isDarkMode ? '#888' : '#888',
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#000' : '#fff',
          },
        })}
      >
        {/* Definieer tabs met bijbehorende componenten en props voor modus */}
        <Tab.Screen name="Home">
          {props => <HomeTab {...props} isDarkMode={isDarkMode} />}
        </Tab.Screen>
        <Tab.Screen name="Workouts">
          {props => <WorkoutsTab {...props} isDarkMode={isDarkMode}/>}
          </Tab.Screen>
        <Tab.Screen name="Map">
          {props => <MapTab {...props} isDarkMode={isDarkMode} />}
          </Tab.Screen>
        <Tab.Screen name="Settings">
          {props => <SettingsTab {...props} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
