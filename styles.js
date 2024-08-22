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
export const workoutStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: isDarkMode ? '#000' : '#fff', // Black in dark mode, white in light mode
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: isDarkMode ? '#555' : '#ccc', // Dark border in dark mode, light in light mode
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: isDarkMode ? '#fff' : '#000', // White text in dark mode, black in light mode
  },
  addButton: {
    backgroundColor: '#007bff', // Blue button background
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // White text on button
    textAlign: 'center',
  },
  exercisesContainer: {
    flex: 1,
  },
  exerciseItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: isDarkMode ? '#333' : '#fbfcf8', // Dark container in dark mode, light in light mode
  },
  exerciseText: {
    color: isDarkMode ? '#fff' : '#000', // White text in dark mode, black in light mode
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#dc3545', // Red button background
    borderRadius: 5,
  },
  clearButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff', // Blue button background
    borderRadius: 5,
  },
});