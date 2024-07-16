import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map(props) {
  const { name, subtitle, coordinate } = props;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={mapRegion}
        region={mapRegion}
      >
        {coordinate && (
          <Marker
            coordinate={coordinate}
            title={name}
            description={subtitle}
          />
        )}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="You are here"
            description="Your current location"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});