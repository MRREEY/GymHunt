import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { workoutStyles } from '../styles';

export default function WorkoutsTab({ isDarkMode }) {
  // States om verschillende gegevens op te slaan in de component
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    // Haal de opgeslagen oefeningen op bij het laden van de component
    retrieveExercises();
  }, []);

  // Functie opgeslagen oefeningen op te halen AsyncStorage
  const retrieveExercises = async () => {
    try {
      const storedExercises = await AsyncStorage.getItem('workoutExercises');
      if (storedExercises !== null) {
        setExercises(JSON.parse(storedExercises)); // Opgehaalde oefeningen in de state zetten
      }
    } catch (error) {
      console.error('Error ophalen exercises:', error);
    }
  };

  // Functie om oefeningen op te slaan AsyncStorage
  const storeExercises = async (updatedExercises) => {
    try {
      await AsyncStorage.setItem('workoutExercises', JSON.stringify(updatedExercises));
    } catch (error) {
      console.error('Error storing exercises:', error);
    }
  };

  // Functie om een nieuwe oefening toe te voegen
  const addExercise = async () => {
    // Controleren of alle input velden ingevuld zijn
    if (exerciseName.trim() === '' || sets.trim() === '' || repetitions.trim() === '' || weight.trim() === '') {
      alert('Please fill in all fields.'); //pop-up als niet alles ingevuld is
      return;
    }

    // Maak nieuwe oefeningobject aan
    const newExercise = {
      name: exerciseName,
      sets: parseInt(sets), // integer voor sets
      repetitions: parseInt(repetitions), // integer voor reps
      weight: parseInt(weight), // integer voor gewicht
    };

    // Voeg de nieuwe oefening toe aan de lijst met oefeningen
    const updatedExercises = [...exercises, newExercise];
    setExercises(updatedExercises);
    await storeExercises(updatedExercises);
 
    // Wis de invoervelden na het toevoegen
    setExerciseName('');
    setSets('');
    setRepetitions('');
    setWeight('');
 
    // Toon een bevestigingsbericht
    alert('Workout is toegevoegd!');
   };

  // Functie verwijderen oefeningen
  const removeExercise = async (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index); // Filteren oefeningen
    setExercises(updatedExercises); // Bijwerken lijst
    await storeExercises(updatedExercises); // Opslaan bijgewerkte versie lijst
  };

  // Functie alles wissen
  const clearAllExercises = async () => {
    setExercises([]); //Leeg lijst
    await AsyncStorage.removeItem('workoutExercises'); //Verwijderen uit AsyncStorage
  };

  return (
    <View style={workoutStyles(isDarkMode).container}>
      {/* Invoerveld oefeningen */}
      <View style={workoutStyles(isDarkMode).inputContainer}>
        <TextInput
          style={workoutStyles(isDarkMode).input}
          placeholder="Exercise"
          placeholderTextColor={isDarkMode ? '#aaa' : '#999'} // Light placeholder in dark mode, dark in light mode
          value={exerciseName}
          onChangeText={(text) => setExerciseName(text)}
        />
        <TextInput
          style={workoutStyles(isDarkMode).input}
          placeholder="Sets"
          placeholderTextColor={isDarkMode ? '#aaa' : '#999'} // Light placeholder in dark mode, dark in light mode
          keyboardType="numeric"
          value={sets}
          onChangeText={(text) => setSets(text)}
        />
        <TextInput
          style={workoutStyles(isDarkMode).input}
          placeholder="Repetitions"
          placeholderTextColor={isDarkMode ? '#aaa' : '#999'} // Light placeholder in dark mode, dark in light mode
          keyboardType="numeric"
          value={repetitions}
          onChangeText={(text) => setRepetitions(text)}
        />
        <TextInput
          style={workoutStyles(isDarkMode).input}
          placeholder="Weight (kg)"
          placeholderTextColor={isDarkMode ? '#aaa' : '#999'} // Light placeholder in dark mode, dark in light mode
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <TouchableOpacity style={workoutStyles(isDarkMode).addButton} onPress={addExercise}>
          <Text style={workoutStyles(isDarkMode).buttonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>
      {/* Oefeningenlijst */}
      <ScrollView style={workoutStyles(isDarkMode).exercisesContainer}>
        {exercises.map((exercise, index) => (
          <View key={index} style={workoutStyles(isDarkMode).exerciseItem}>
            <Text style={workoutStyles(isDarkMode).exerciseText}>{exercise.name}</Text>
            <Text style={workoutStyles(isDarkMode).exerciseText}>
              {exercise.sets} sets - {exercise.repetitions} reps - {exercise.weight} kg
            </Text>
            <TouchableOpacity style={workoutStyles(isDarkMode).removeButton} onPress={() => removeExercise(index)}>
              <Text style={workoutStyles(isDarkMode).buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* Knoppie om alle oefeningen te wissen */}
      <TouchableOpacity style={workoutStyles(isDarkMode).clearButton} onPress={clearAllExercises}>
        <Text style={workoutStyles(isDarkMode).buttonText}>Clear All Exercises</Text>
      </TouchableOpacity>
    </View>
  );
}
