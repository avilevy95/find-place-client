// src/screens/Home/PlaceDetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AppButton from '../../components/UI/AppButton';
import { Ionicons } from '@expo/vector-icons'; // בהנחה שמשתמשים ב-Expo Icons

export default function PlaceDetailsScreen({route,navigation}) {
  const { placeId } = route.params || {};
  // ניתן למשוך מידע אמיתי משרת. כרגע "Hardcoded".
  const place = {
    displayName:'פסטיבל יין וגשר בקיקריה',
    rating:5.0,
    formattedAddress:'שדרות חיים נחמן ביאליק 22',
    hours:'20:00-00:30 PM',
    description:'טקסט הסבר על המקום טקסט הסבר על המקום טקסט...',
    distance:'12 ק"מ',
    primaryType:'קריית חיים'
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{uri:'https://example.com/wine_festival.jpg'}}
        style={styles.image}
      />
      <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton} onPress={()=>{}}>
        <Ionicons name="share-social" size={24} color="#fff"/>
      </TouchableOpacity>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{place.displayName}</Text>
        <Text style={styles.subTitle}>{place.primaryType} | {place.distance} </Text>
        <Text style={styles.address}>כתובת: {place.formattedAddress}</Text>
        <Text style={styles.hours}>שעות פעילות: {place.hours}</Text>
        <Text style={styles.rating}>דירוג: {place.rating} ★</Text>
        <Text style={styles.description}>{place.description}</Text>
      </ScrollView>

      <AppButton title="הזמן כרטיסים" onPress={()=>{}} style={{margin:20}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#121212'},
  image:{width:'100%', height:200},
  backButton:{position:'absolute', top:40, left:20, backgroundColor:'rgba(0,0,0,0.5)', borderRadius:20, padding:5},
  shareButton:{position:'absolute', top:40, right:20, backgroundColor:'rgba(0,0,0,0.5)', borderRadius:20, padding:5},
  content:{padding:20},
  title:{color:'#fff', fontSize:20, marginBottom:10},
  subTitle:{color:'#aaa', marginBottom:10},
  address:{color:'#ccc', marginBottom:10},
  hours:{color:'#ccc', marginBottom:10},
  rating:{color:'#fff', marginBottom:10},
  description:{color:'#ccc', lineHeight:20}
});
