// src/screens/Onboarding/OnboardingScreen2.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import AppButton from '../../components/UI/AppButton';

export default function OnboardingScreen2({navigation}) {
  return (
    <ImageBackground 
      source={{uri: 'https://example.com/nature_image.jpg'}} 
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>גלו מקומות חדשים</Text>
        <Text style={styles.description}>
          צאו להרפתקאות במקומות שלא הכרתם מעולם, 
          בחרו יעדים מסקרנים וגלו חוויות חדשות...
        </Text>

        <AppButton title="המשך" onPress={()=>navigation.navigate('Onboarding3')} />
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.skip}>דלג</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bg: {flex:1, justifyContent:'flex-end'},
  overlay:{backgroundColor:'rgba(0,0,0,0.5)', padding:20},
  title:{fontSize:24, color:'#fff', textAlign:'center', marginBottom:10},
  description:{fontSize:16, color:'#ccc', textAlign:'center', marginBottom:20},
  skip:{color:'#fff', textAlign:'center', marginTop:10, textDecorationLine:'underline'}
});
