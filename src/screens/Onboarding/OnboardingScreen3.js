// src/screens/Onboarding/OnboardingScreen3.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import AppButton from '../../components/UI/AppButton';

export default function OnboardingScreen3({navigation}) {
  return (
    <ImageBackground 
      source={{uri: 'https://example.com/another_background.jpg'}} 
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>התאמה אישית לפי ההעדפות שלכם</Text>
        <Text style={styles.description}>
          בעזרת שאלון קצר נכיר אתכם טוב יותר ונציע לכם 
          מקומות ופעילויות שהכי מתאימים לכם.
        </Text>

        <AppButton title="המשך" onPress={()=>navigation.navigate('OnboardingFinish')} />
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
