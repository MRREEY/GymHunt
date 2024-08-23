import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles';

const HomeTab = ({ isDarkMode }) => {
  const [hotspots, setHotspots] = useState([]); //state voor lijst hotspots
  const navigation = useNavigation(); //Om te kunnen navigeren schermen

  useEffect(() => {
    // Fetch data van web server
    const fetchHotspots = async () => {
      try {
        const response = await fetch('https://stud.hosted.hr.nl/0991841/Trainingsstudio.json');
        const data = await response.json(); //Omzetten JSON naar bruikbaar js
        setHotspots(data); //update state met opgehaalde data
      } catch (error) {
        console.error('Error fetching hotspots:', error); //Indien problemen Fetch
      }
    };
    fetchHotspots(); //Aanroepen Fetch functie
  }, []);

  const handleSelectHotspot = (hotspot) => {
    navigation.navigate('Map', { selectedHotspot: hotspot }); //Navigatie naar "Map" met gekozen hotspot als para
  };

  return (
    <View style={[globalStyles.container, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
      <Text style={[globalStyles.title, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>
        Sportscholen Lijst
      </Text>
      {/* Hotspot list */}
      <FlatList
        data={hotspots}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.item}
            onPress={() => handleSelectHotspot(item)}
          >
            {/* Naam sportscholen/studio's */}
            <Text style={[globalStyles.itemText, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeTab;
