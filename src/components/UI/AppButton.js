import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AppButton({title, onPress, style}) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:'#007BFF',
    padding:15,
    borderRadius:10,
    alignItems:'center',
    marginVertical:5
  },
  text:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold'
  }
});
