import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

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
  // //testen aanvraag axios
  // axios.post('https://example.com/api/exercises', newExercise)
  // .then(response => {
  //     console.log(response.data);
  //   })
  // .catch(error => {
  //     console.error(error);
  //   });
};

  //Wat binnen de view te zien valt
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Exercise"
          placeholderTextColor={'#9a7324'}
          value={exerciseName}
          onChangeText={(text) => setExerciseName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sets"
          placeholderTextColor={'#9a7324'}
          keyboardType="numeric"
          value={sets}
          onChangeText={(text) => setSets(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Repetitions"
          placeholderTextColor={'#9a7324'}
          keyboardType="numeric"
          value={repetitions}
          onChangeText={(text) => setRepetitions(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor={'#9a7324'}
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addExercise}>
          <Text style={styles.buttonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.exercisesContainer}>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <Text style={styles.exerciseText}>{exercise.name}</Text>
            <Text style={styles.exerciseText}>{exercise.sets} sets - {exercise.repetitions} reps - {exercise.weight} kg</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  exercisesContainer: {
    flex: 1,
  },
  exerciseItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  exerciseText: {
    fontWeight: 'bold',
  }
});
