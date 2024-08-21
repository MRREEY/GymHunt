import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { mapStyles } from '../styles';

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markersData, setMarkersData] = useState([]);

  // Get the current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

   // Fetch data van webservice
   useEffect(() => {
    const fetchMarkersData = async () => {
      try {
        const response = await fetch('https://stud.hosted.hr.nl/0991841/Trainingsstudio.json');
        const data = await response.json();
        setMarkersData(data);
      } catch (error) {
        console.error('Error fetching markers data:', error);
      }
    };

    fetchMarkersData();
  }, []);

  return (
    <View style={mapStyles.mapContainer}>
      <MapView 
        style={mapStyles.map} 
        initialRegion={mapRegion}
        region={mapRegion}
      >
        {markersData.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.name}
            description={marker.category}
            image={require('../assets/marker_gyms.png')}

          />
        ))}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Jij bent hier!"
            description="Je huidige locatie"
            image={require('../assets/marker_user.png')}
          />
        )}
      </MapView>
    </View>
  );
}
