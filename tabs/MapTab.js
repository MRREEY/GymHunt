import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapStyles } from '../styles';

export default function MapTab({ route }) {
  const { selectedHotspot } = route.params || {}; // Get the selected hotspot vanuit route params

  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markersData, setMarkersData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null); // State to track the selected marker

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
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  // Fetch data from web service
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

  useEffect(() => {
    if (selectedHotspot) {
      // Zoom in on the selected hotspot
      setMapRegion({
        latitude: selectedHotspot.coordinate.latitude,
        longitude: selectedHotspot.coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setSelectedMarker(selectedHotspot); // Set the selected hotspot
    }
  }, [selectedHotspot]);

  return (
    <View style={mapStyles.mapContainer}>
      <MapView 
        style={mapStyles.map} 
        initialRegion={mapRegion}
        region={mapRegion}
      >
        {/* Trainingsstudio's markers */}
        {markersData.map((marker, index) => (
          <Marker
          key={index}
          coordinate={marker.coordinate}
          title={marker.name}
          description={marker.category}
          image={require('../assets/marker_gyms.png')}
          onPress={() => setSelectedMarker(marker)} // Set marker on press pin
          />
        ))}
        {/* User marker */}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Jij bent hier!"
            description="Je huidige locatie"
            image={require('../assets/marker_user.png')}
          />
        )}
      </MapView>

      {/* Info box for the selected marker */}
      {selectedMarker && (
        <View style={mapStyles.infoBox}>
          <Text style={mapStyles.infoTitle}>{selectedMarker.name}</Text>
          <Text style={mapStyles.infoCategory}>{selectedMarker.category}</Text>
          <TouchableOpacity style={mapStyles.closeButton} onPress={() => setSelectedMarker(null)}>
            <Text style={mapStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}