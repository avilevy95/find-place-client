import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppButton from '../../components/UI/AppButton';
import Tag from '../../components/UI/Tag';

const ALL_INTERESTS = ["טיולי טבע", "ספא", "ערים מעניינות", "מוזיאונים", "חיי לילה", "מסעדות גורמה", "טיולים משפחתיים", "תרבות", "קולנוע", "ים וחופים", "ספורט אתגרי", "פארקים לילדים", "נסיעות אופניים"];

export default function InterestsSelectionScreen({navigation}) {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if(selectedInterests.includes(interest)){
      setSelectedInterests(selectedInterests.filter(i=>i!==interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>אילו מהנושאים מעניינים אותך?</Text>
      <Text style={styles.subtitle}>10/10</Text>

      <FlatList
        data={ALL_INTERESTS}
        keyExtractor={(item)=>item}
        numColumns={2}
        columnWrapperStyle={{justifyContent:'space-between'}}
        renderItem={({item})=>(
          <Tag 
            label={item} 
            selected={selectedInterests.includes(item)}
            onPress={()=>toggleInterest(item)}
          />
        )}
        style={{marginVertical:20}}
      />

      <AppButton title="המשך" onPress={()=>navigation.navigate('BirthDate')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#121212', padding:20, paddingTop:60},
  title:{color:'#fff', fontSize:20, textAlign:'center'},
  subtitle:{color:'#aaa', textAlign:'center', marginBottom:20}
});
