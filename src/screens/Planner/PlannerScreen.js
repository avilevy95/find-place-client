import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import RangeSlider from '../../components/RangeSlider';
import TransportModeSelector from '../../components/TransportModeSelector';
import CitySelector from '../../components/CitySelector/CitySelector';
import { categoryService } from '../../services/categoryService';

export default function PlannerScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // שליטה בתצוגת הדרופדאון
  const [priceRange, setPriceRange] = useState([20, 200]);
  const [distanceRange, setDistanceRange] = useState([0, 50]);
  const [transportMode, setTransportMode] = useState('רכב פרטי');
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.loadCategories();
        setCategories(data || []);
        setFilteredCategories(data || []);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    setIsDropdownVisible(true); // שמירה על הדרופדאון פתוח בזמן ההקלדה

    if (text === '') {
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
    setSearchText(name);
    setIsDropdownVisible(false); // סגירת הדרופדאון לאחר בחירה
  };

  const handleSearch = () => {
    const location = selectedCity?.coordinates;

    if (!location) {
      alert('אנא בחר עיר או אפשר שימוש במיקום שלך.');
      return;
    }

    if (!selectedCategory) {
      alert('אנא בחר קטגוריה.');
      return;
    }

    navigation.navigate('SearchResults', {
      category: selectedCategory,
      location,
      radius: distanceRange[1],
      transportMode,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>תכנון יציאה</Text>

      {/* קטגוריות עם שדה חיפוש */}
      <Text style={styles.label}>בחר קטגוריה:</Text>
      <TextInput
        style={styles.input}
        placeholder="הזן קטגוריה"
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={handleSearchTextChange}
        onFocus={() => setIsDropdownVisible(true)} // הצגת הדרופדאון כשהשדה בפוקוס
      />
      {isDropdownVisible && (
        <ScrollView style={styles.dropdown} nestedScrollEnabled>
          {filteredCategories.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={[
                styles.categoryButton,
                selectedCategory === item.name && styles.selectedCategory,
              ]}
              onPress={() => handleCategorySelect(item.name)}
            >
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* City Selector */}
      <CitySelector selectedCity={selectedCity} setSelectedCity={setSelectedCity} />

      {/* Transport Mode Selector */}
      <TransportModeSelector selectedMode={transportMode} onModeChange={setTransportMode} />

      {/* Price Range Slider */}
      <RangeSlider
        label="טווח מחירים"
        values={priceRange}
        onValuesChange={setPriceRange}
        min={20}
        max={200}
        step={10}
        formatLabel={(min, max) => `${min}₪ - ${max}₪`}
      />

      {/* Distance Range Slider */}
      <RangeSlider
        label="טווח מרחק"
        values={distanceRange}
        onValuesChange={setDistanceRange}
        min={0}
        max={100}
        step={5}
        formatLabel={(min, max) => `${min} ק"מ - ${max} ק"מ`}
      />

      {/* Search Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleSearch}>
        <Text style={styles.confirmButtonText}>חפש</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    backgroundColor: '#1e1e1e',
    textAlign: 'right',
  },
  dropdown: {
    maxHeight: 150,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  categoryButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  selectedCategory: {
    backgroundColor: '#007BFF',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'right',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'right',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
