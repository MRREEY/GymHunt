// MapTab.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapStyles } from '../styles'; 

export default function MapTab({ route, isDarkMode }) {
  const { selectedHotspot } = route.params || {}; // Pak de hotspots vanuit route params

  //State hudige locatie standaard 0 en map regio wat breder
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //state markers op de kaart en welke geselecteerd zijn
  const [markersData, setMarkersData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null); 

  // pak huidige locatie
  useEffect(() => {
    (async () => {
      // Permissie locatie gebruik
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Toegang afgewezen voor locatie');
        return;
      }

      // Haal huidige locatie op en wijzig de state
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

  // Fetch data van web service
  useEffect(() => {
    const fetchMarkersData = async () => {
      try {
        const response = await fetch('https://stud.hosted.hr.nl/0991841/Trainingsstudio.json');
        const data = await response.json();
        setMarkersData(data); //Wijzig state markersData
      } catch (error) {
        console.error('Error fetching markers data:', error);
      }
    };
    fetchMarkersData();
  }, []);

  // UseEffect voor inzoomen geselecteerde hotspot
  useEffect(() => {
    if (selectedHotspot) {
      // Zoom in on the selected hotspot
      setMapRegion({
        latitude: selectedHotspot.coordinate.latitude,
        longitude: selectedHotspot.coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setSelectedMarker(selectedHotspot); // sla geselecteerde marker op
    }
  }, [selectedHotspot]);

  return (
    <View style={{ flex: 1 }}>
      <MapView 
        style={{ flex: 1 }} 
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
        {/* Gebruiker marker */}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Jij bent hier!"
            description="Je huidige locatie"
            image={require('../assets/marker_user.png')}
          />
        )}
      </MapView>

      {/* Info box voor de geselecteerde marker */}
      {selectedMarker && (
        <View style={mapStyles(isDarkMode).infoBox}>
          <Text style={mapStyles(isDarkMode).infoTitle}>{selectedMarker.name}</Text>
          <Text style={mapStyles(isDarkMode).infoCategory}>{selectedMarker.category}</Text>
          <TouchableOpacity style={mapStyles(isDarkMode).closeButton} onPress={() => setSelectedMarker(null)}>
            <Text style={mapStyles(isDarkMode).closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
