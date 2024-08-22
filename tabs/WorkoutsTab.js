import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { workoutStyles } from '../styles';

export default function WorkoutsTab() {
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    // Haal de opgeslagen oefeningen op bij het laden van de component
    retrieveExercises();
  }, []);

  const retrieveExercises = async () => {
    try {
      const storedExercises = await AsyncStorage.getItem('workoutExercises');
      if (storedExercises !== null) {
        setExercises(JSON.parse(storedExercises));
      }
    } catch (error) {
      console.error('Error retrieving exercises:', error);
    }
  };

  const storeExercises = async (updatedExercises) => {
    try {
      await AsyncStorage.setItem('workoutExercises', JSON.stringify(updatedExercises));
    } catch (error) {
      console.error('Error storing exercises:', error);
    }
  };

  const addExercise = async () => {
    if (exerciseName.trim() === '' || sets.trim() === '' || repetitions.trim() === '' || weight.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    const newExercise = {
      name: exerciseName,
      sets: parseInt(sets),
      repetitions: parseInt(repetitions),
      weight: parseInt(weight),
    };

    try {
      // Verzend een POST-verzoek naar de webservice om de oefening op te slaan
      const response = await axios.post('https://example.com/api/exercises', newExercise);

      // Controleer of het verzoek succesvol is verwerkt
      if (response.status === 200) {
        // Wis de invoervelden
        setExerciseName('');
        setSets('');
        setRepetitions('');
        setWeight('');

        // Toon een bevestigingsbericht
        alert('Exercise added successfully!');
      } else {
      // Toon een foutbericht
        alert('Error adding exercise: ' + response.statusText);
      }
    } catch (error) {
    // Controleer of de fout is veroorzaakt door een gebrek aan internetverbinding 
      if (!navigator.onLine) {
        // Sla de oefening lokaal op als er geen internetverbinding beschikbaar is
        const updatedExercises = [...exercises, newExercise];
        setExercises(updatedExercises);
        storeExercises(updatedExercises);
      } else {
      // Toon een foutbericht als er een andere fout is opgetreden
        alert('Error adding exercise: ' + error.message);
      }
    }
  };

  const removeExercise = async (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
    await storeExercises(updatedExercises);
  };

  const clearAllExercises = async () => {
    setExercises([]);
    await AsyncStorage.removeItem('workoutExercises');
  };

  return (
    <View style={workoutStyles.container}>
      <View style={workoutStyles.inputContainer}>
        <TextInput
          style={workoutStyles.input}
          placeholder="Exercise"
          placeholderTextColor={'#9a7324'}
          value={exerciseName}
          onChangeText={(text) => setExerciseName(text)}
        />
        <TextInput
          style={workoutStyles.input}
          placeholder="Sets"
          placeholderTextColor={'#9a7324'}
          keyboardType="numeric"
          value={sets}
          onChangeText={(text) => setSets(text)}
        />
        <TextInput
          style={workoutStyles.input}
          placeholder="Repetitions"
          placeholderTextColor={'#9a7324'}
          keyboardType="numeric"
          value={repetitions}
          onChangeText={(text) => setRepetitions(text)}
        />
        <TextInput
          style={workoutStyles.input}
          placeholder="Weight (kg)"
          placeholderTextColor={'#9a7324'}
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <TouchableOpacity style={workoutStyles.addButton} onPress={addExercise}>
          <Text style={workoutStyles.buttonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={workoutStyles.exercisesContainer}>
        {exercises.map((exercise, index) => (
          <View key={index} style={workoutStyles.exerciseItem}>
            <Text style={workoutStyles.exerciseText}>{exercise.name}</Text>
            <Text style={workoutStyles.exerciseText}>
              {exercise.sets} sets - {exercise.repetitions} reps - {exercise.weight} kg
            </Text>
            <TouchableOpacity style={workoutStyles.removeButton} onPress={() => removeExercise(index)}>
              <Text style={workoutStyles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={workoutStyles.clearButton} onPress={clearAllExercises}>
        <Text style={workoutStyles.buttonText}>Clear All Exercises</Text>
      </TouchableOpacity>
    </View>
  );
}