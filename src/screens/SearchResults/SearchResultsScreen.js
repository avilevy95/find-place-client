import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';

import { searchPlaces } from '../../services/googlePlacesService';
import ResultItem from '../../components/ResultItem';



export default function SearchResultsScreen({ route }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category, location, radius, transportMode } = route.params;
 
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const searchResults = await searchPlaces(category, location, radius, transportMode);
        setResults(searchResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]); // תוצאות ריקות במקרה של כשל
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [category, location, radius, transportMode]); 

  if (loading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>טוען תוצאות...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item, index) => item.id || index.toString()} 
        renderItem={({ item }) => (
          <ResultItem
            item={item}
            onPress={() => console.log('Item pressed', item)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyResults}>לא נמצאו תוצאות</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007BFF',
  },
  emptyResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 16,
  },
});