import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles';

const HomeTab = ({ isDarkMode }) => {
  const [hotspots, setHotspots] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch data from the web service
    const fetchHotspots = async () => {
      try {
        const response = await fetch('https://stud.hosted.hr.nl/0991841/Trainingsstudio.json');
        const data = await response.json();
        setHotspots(data);
      } catch (error) {
        console.error('Error fetching hotspots:', error);
      }
    };

    fetchHotspots();
  }, []);

  const handleSelectHotspot = (hotspot) => {
    navigation.navigate('Map', { selectedHotspot: hotspot });
  };

  return (
    <View style={[globalStyles.container, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
      <Text style={[globalStyles.title, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>
        Sportscholen Lijst
      </Text>
      <FlatList
        data={hotspots}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.item}
            onPress={() => handleSelectHotspot(item)}
          >
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
