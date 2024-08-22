import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#000', // Achtergrondkleur voor Dark Mode
  },
  lightContainer: {
    backgroundColor: '#fff', // Achtergrondkleur voor Light Mode
  },
  text: {
    fontSize: 18,
  },
  darkText: {
    color: '#fff', // Tekstkleur voor Dark Mode
  },
  lightText: {
    color: '#000', // Tekstkleur voor Light Mode
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  darkButton: {
    backgroundColor: '#555', // Achtergrondkleur van de button in Dark Mode
  },
  lightButton: {
    backgroundColor: '#ddd', // Achtergrondkleur van de button in Light Mode
  },
  darkButtonText: {
    color: '#fff', // Tekstkleur van de button in Dark Mode (wit)
  },
  lightButtonText: {
    color: '#000', // Tekstkleur van de button in Light Mode (zwart)
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
  },
  darkItem: {
    borderBottomColor: '#444',
  },
  lightItem: {
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export const mapStyles = StyleSheet.create({
  mapContainer: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});

export const workoutStyles = StyleSheet.create({
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
