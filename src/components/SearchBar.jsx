import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChangeText, placeholder }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#888"
    />
  </View>
);

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});

export default SearchBar;
