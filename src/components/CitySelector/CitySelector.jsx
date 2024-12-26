import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { getCurrentLocation } from './locationUtils';
import israelCities from './israelCities';
import LocationLoadingAnimation from './LocationLoadingAnimation';

const CitySelector = ({
  selectedCity,
  setSelectedCity,
}) => {
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Prepare cities list with current location as the first option
  const citiesList = useMemo(() => [
    { 
      name: 'המיקום הנוכחי שלי', 
      coordinates: null, 
      isCurrentLocation: true 
    },
    ...israelCities
  ], []);

  // Filter cities based on search term
  const filteredCities = useMemo(() => {
    if (!searchTerm) return citiesList;
    return citiesList.filter(city => 
      city.name.includes(searchTerm) || 
      city.isCurrentLocation
    );
  }, [citiesList, searchTerm]);

  const handleCitySelection = async (city) => {
    if (city.isCurrentLocation) {
      setIsLoadingLocation(true);
      try {
        const location = await getCurrentLocation();
        if (location) {
          setSelectedCity(location);
        } else {
          // Fallback to a default city if location retrieval fails
          setSelectedCity(israelCities[0]);
        }
      } catch (error) {
        console.error('Location selection error:', error);
        setSelectedCity(israelCities[0]);
      } finally {
        setIsLoadingLocation(false);
      }
    } else {
      setSelectedCity(city);
      setSearchTerm('');
    }
    setIsCityModalVisible(false);
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cityItem}
      onPress={() => handleCitySelection(item)}
    >
      <Text style={[
        styles.cityItemText,
        item.isCurrentLocation && styles.currentLocationText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>בחירת עיר</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsCityModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedCity ? selectedCity.name : 'בחר עיר'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCityModalVisible}
        onRequestClose={() => {
          setIsCityModalVisible(false);
          setSearchTerm('');
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          {isLoadingLocation ? (
            <LocationLoadingAnimation />
          ) : (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>בחר עיר</Text>
              
              {/* Search Input */}
              <TextInput
                style={styles.searchInput}
                placeholder="חפש עיר..."
                placeholderTextColor="#888"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />

              {/* Cities List */}
              <FlatList
                data={filteredCities}
                renderItem={renderCityItem}
                keyExtractor={(item) => item.name}
                style={styles.cityList}
                keyboardShouldPersistTaps="handled"
              />

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setIsCityModalVisible(false);
                  setSearchTerm('');
                }}
              >
                <Text style={styles.closeButtonText}>סגור</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
};

CitySelector.propTypes = {
  selectedCity: PropTypes.shape({
    name: PropTypes.string,
    coordinates: PropTypes.object,
    isCurrentLocation: PropTypes.bool
  }),
  setSelectedCity: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    marginBottom: 50,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    textAlign: 'right',
  },
  cityList: {
    flex: 1,
  },
  cityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cityItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  currentLocationText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CitySelector;
// import React, { useState, useMemo } from 'react';
// import { View, Text, TouchableOpacity, Modal, FlatList, TextInput, StyleSheet, SafeAreaView } from 'react-native';
// import PropTypes from 'prop-types';
// import { getCurrentLocation } from './locationUtils';
// import israelCities from './israelCities';
// import LocationLoadingAnimation from './LocationLoadingAnimation';

// const CitySelector = ({
//   selectedCity,
//   setSelectedCity,
// }) => {
//   const [isCityModalVisible, setIsCityModalVisible] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoadingLocation, setIsLoadingLocation] = useState(false);

//   // Prepare cities list with current location as the first option
//   const citiesList = useMemo(() => [
//     { 
//       name: 'המיקום הנוכחי שלי', 
//       coordinates: null, 
//       isCurrentLocation: true 
//     },
//     ...israelCities
//   ], []);

//   // Filter cities based on search term
//   const filteredCities = useMemo(() => {
//     if (!searchTerm) return citiesList;
//     return citiesList.filter(city => 
//       city.name.includes(searchTerm) || 
//       city.isCurrentLocation
//     );
//   }, [citiesList, searchTerm]);

//   const handleCitySelection = async (city) => {
//     if (city.isCurrentLocation) {
//       setIsLoadingLocation(true);
//       try {
//         const location = await getCurrentLocation();
//         if (location) {
//           setSelectedCity(location);
//         } else {
//           // Fallback to a default city if location retrieval fails
//           setSelectedCity(israelCities[0]);
//         }
//       } catch (error) {
//         console.error('Location selection error:', error);
//         setSelectedCity(israelCities[0]);
//       } finally {
//         setIsLoadingLocation(false);
//       }
//     } else {
//       setSelectedCity(city);
//     }
//     setIsCityModalVisible(false);
//     setSearchTerm('');
//   };

//   const renderCityItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.cityItem}
//       onPress={() => handleCitySelection(item)}
//     >
//       <Text style={[
//         styles.cityItemText,
//         item.isCurrentLocation && styles.currentLocationText
//       ]}>
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>בחירת עיר</Text>
      
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => setIsCityModalVisible(true)}
//       >
//         <Text style={styles.buttonText}>
//           {selectedCity ? selectedCity.name : 'בחר עיר'}
//         </Text>
//       </TouchableOpacity>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isCityModalVisible}
//         onRequestClose={() => {
//           setIsCityModalVisible(false);
//           setSearchTerm('');
//         }}
//       >
//         <SafeAreaView style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>בחר עיר</Text>
            
//             {/* Search Input */}
//             <TextInput
//               style={styles.searchInput}
//               placeholder="חפש עיר..."
//               placeholderTextColor="#888"
//               value={searchTerm}
//               onChangeText={setSearchTerm}
//             />

//             {/* Cities List */}
//             <FlatList
//               data={filteredCities}
//               renderItem={renderCityItem}
//               keyExtractor={(item) => item.name}
//               style={styles.cityList}
//               keyboardShouldPersistTaps="handled"
//             />

//             {/* Close Button */}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => {
//                 setIsCityModalVisible(false);
//                 setSearchTerm('');
//               }}
//             >
//               <Text style={styles.closeButtonText}>סגור</Text>
//             </TouchableOpacity>
//           </View>
//         </SafeAreaView>
//       </Modal>
//     </View>
//   );
// };

// CitySelector.propTypes = {
//   selectedCity: PropTypes.shape({
//     name: PropTypes.string,
//     coordinates: PropTypes.object,
//     isCurrentLocation: PropTypes.bool
//   }),
//   setSelectedCity: PropTypes.func.isRequired,
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: 'white',
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#333',
//     padding: 10,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     flex: 1,
//     backgroundColor: 'white',
//     marginTop: 50,
//     marginBottom: 50,
//     marginHorizontal: 20,
//     borderRadius: 10,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   searchInput: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 15,
//     textAlign: 'right',
//   },
//   cityList: {
//     flex: 1,
//   },
//   cityItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   cityItemText: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   currentLocationText: {
//     color: '#007BFF',
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     backgroundColor: '#333',
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 15,
//   },
//   closeButtonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
// });

// export default CitySelector;