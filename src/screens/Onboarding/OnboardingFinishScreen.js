// src/screens/Onboarding/OnboardingFinishScreen.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import AppButton from '../../components/UI/AppButton';

export default function OnboardingFinishScreen({navigation}) {
  return (
    <ImageBackground 
      source={{uri: 'https://example.com/completion_background.jpg'}} 
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>סיימת את תהליך ההיכרות הראשוני!</Text>
        <Text style={styles.description}>
          עכשיו נרצה להכיר אותך קצת יותר, כדי להתאים לך חוויות מדויקות.
        </Text>

        <AppButton title="פתח חשבון" onPress={()=>navigation.navigate('SignUp')} />
        <AppButton title="כניסה" onPress={()=>navigation.navigate('Login')} style={{backgroundColor:'#222'}} />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bg: {flex:1, justifyContent:'flex-end'},
  overlay:{backgroundColor:'rgba(0,0,0,0.5)', padding:20},
  title:{fontSize:24, color:'#fff', textAlign:'center', marginBottom:10},
  description:{fontSize:16, color:'#ccc', textAlign:'center', marginBottom:20},
});
