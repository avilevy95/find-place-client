import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Tag({label, selected, onPress}) {
  return (
    <TouchableOpacity 
      style={[styles.tag, selected && styles.selected]} 
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag:{
    backgroundColor:'#333',
    borderRadius:20,
    paddingHorizontal:15,
    paddingVertical:10,
    marginVertical:5,
  },
  selected:{
    backgroundColor:'#007BFF'
  },
  text:{
    color:'#fff',
    fontSize:14
  },
  selectedText:{
    fontWeight:'bold'
  }
});
