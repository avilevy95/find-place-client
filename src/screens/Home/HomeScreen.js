import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import AppButton from '../../components/UI/AppButton';
import ResultItem from '../../components/ResultItem';

const mockPlaces = [
  {id:'1', displayName:{text:'הפארק הלאומי ברמת גן'}, rating:7.3, formattedAddress:'רמת גן', primaryTypeDisplayName:{text:'חינם'}, distance:'20 דק\' נסיעה', priceLevel:null},
  {id:'2', displayName:{text:'סיור יקב'}, rating:8.5, formattedAddress:'נתחם חיים נחמן', primaryTypeDisplayName:{text:'בתשלום'}, distance:'30 דק\' נסיעה', priceLevel:'PRICE_LEVEL_MODERATE'},
];

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>אלו האופציות שמצאנו עבורך</Text>
      
      <FlatList
        data={mockPlaces}
        keyExtractor={item=>item.id}
        renderItem={({item})=>(
          <ResultItem
            item={item}
            onPress={()=>navigation.navigate('PlaceDetails', {placeId:item.id})}
          />
        )}
      />

      {/* תפריט תחתון: אפשר ליצור BottomTabBar.js לפי העיצוב */}
      {/* כאן בינתיים מימוש ריק */}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#121212', padding:20},
  title:{color:'#fff', fontSize:20, textAlign:'center', marginBottom:20}
});
