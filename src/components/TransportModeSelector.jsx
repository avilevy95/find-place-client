import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const transportModes = [
  {
    name: 'רגל',
    icon: 'walk', // שם האייקון המעודכן
    color: '#4CAF50',
  },
  {
    name: 'תחבורה ציבורית',
    icon: 'bus', // שם האייקון המעודכן
    color: '#2196F3',
  },
  {
    name: 'רכב פרטי',
    icon: 'car', // שם האייקון המעודכן
    color: '#FF9800',
  },
];

const TransportModeSelector = ({ selectedMode, onModeChange }) => (
  <View style={styles.container}>
      <Text style={styles.label}>איך אתם מגיעים?</Text>
    <View style={styles.modeContainer}>
      {transportModes.map((mode) => (
        <TouchableOpacity
          key={mode.name}
          style={[
            styles.modeButton,
            selectedMode === mode.name && styles.selectedModeButton,
          ]}
          onPress={() => onModeChange(mode.name)}
        >
          <Ionicons
            name={mode.icon} 
            size={24}
            color={selectedMode === mode.name ? 'white' : mode.color}
          />
          <Text
            style={[
              styles.modeText,
              selectedMode === mode.name && styles.selectedModeText,
            ]}
          >
            {mode.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

TransportModeSelector.propTypes = {
  selectedMode: PropTypes.string.isRequired,
  onModeChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modeButton: {
    flex: 0.3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
  },
  selectedModeButton: {
    backgroundColor: '#007BFF',
  },
  modeText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  selectedModeText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TransportModeSelector;
