// src/screens/Preferences/BirthDateScreen.js
import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppButton from '../../components/UI/AppButton';
// ניתן להשתמש בספרייה כמו react-native-calendars או datepicker
// לשם הפשטות נניח שאנחנו רק מציגים טקסט "בחירת תאריך"
// כאן אפשר להוסיף לוח שנה אמיתי בהמשך

export default function BirthDateScreen({navigation}) {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>תאריך לידה</Text>

      <View style={styles.calendarContainer}>
        <Text style={{color:'#fff', marginBottom:10}}>בחר תאריך (מדומה)</Text>
        {/* כאן תאורטית שתול לוח שנה. כרגע אוסיף כפתור המדמה בחירה */}
        <AppButton title="בחר 15/06/2024" onPress={()=>setSelectedDate('15/06/2024')} style={{marginVertical:20}}/>
        
        {selectedDate && <Text style={{color:'#fff'}}>נבחר: {selectedDate}</Text>}
      </View>

      <View style={styles.steps}>
        <Text style={[styles.step, {color:'#fff'}]}>1</Text>
        <Text style={[styles.step, {color:'#fff'}]}>2</Text>
        <Text style={[styles.step, {color: selectedDate ? '#0f0':'#fff'}]}>3</Text>
      </View>

      <AppButton 
        title="המשך" 
        onPress={()=>navigation.navigate('RegComplete')} 
        style={{marginTop:20}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#121212', padding:20, paddingTop:60},
  title:{color:'#fff', fontSize:20, textAlign:'center', marginBottom:20},
  calendarContainer:{alignItems:'center', justifyContent:'center', flex:1},
  steps:{flexDirection:'row', justifyContent:'space-evenly', marginBottom:20},
  step:{fontSize:16, borderWidth:1, borderColor:'#fff', borderRadius:10, width:30, height:30, textAlign:'center', textAlignVertical:'center'}
});
