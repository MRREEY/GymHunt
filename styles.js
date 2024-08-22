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
export const mapStyles = (isDarkMode) => StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoBox: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: isDarkMode ? '#333' : '#fff', // Black in dark mode, white in light mode
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000', // White text in dark mode, black text in light mode
  },
  infoCategory: {
    fontSize: 14,
    color: isDarkMode ? '#ccc' : '#555', // Light grey text in dark mode, dark grey in light mode
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff', // Blue button background
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff', // White text on the button
    textAlign: 'center',
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