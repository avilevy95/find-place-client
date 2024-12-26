// src/screens/Preferences/RegistrationCompleteScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppButton from '../../components/UI/AppButton';

export default function RegistrationCompleteScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>סיימת את תהליך ההרשמה בהצלחה!</Text>
      <Text style={styles.description}>הגענו לסוף! עכשיו אפשר להתחיל להנות מהאפליקציה.</Text>

      <View style={styles.steps}>
        <Text style={[styles.step,{color:'#0f0'}]}>1</Text>
        <Text style={[styles.step,{color:'#0f0'}]}>2</Text>
        <Text style={[styles.step,{color:'#0f0'}]}>3</Text>
      </View>

      <AppButton 
        title="המשך"
        onPress={()=>navigation.navigate('Planner')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#121212', padding:20, justifyContent:'center'},
  title:{fontSize:24, color:'#fff', textAlign:'center', marginBottom:20},
  description:{fontSize:16, color:'#ccc', textAlign:'center', marginBottom:40},
  steps:{flexDirection:'row', justifyContent:'space-evenly', marginBottom:20},
  step:{fontSize:16, borderWidth:1, borderColor:'#fff', borderRadius:10, width:30, height:30, textAlign:'center', textAlignVertical:'center'}
});
