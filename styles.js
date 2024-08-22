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

//Stylesheet MapTab.js
export const mapStyles = StyleSheet.create({
  map: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  infoBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoCategory: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

//WorkoutsTab.js
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
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  clearButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});