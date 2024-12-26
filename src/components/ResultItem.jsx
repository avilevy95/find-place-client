import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ResultItem({ item, onPress }) {

  // 1. פונקציה לפתיחת אתר אינטרנט
  const handleOpenWebsite = () => {
    if (item.websiteUri) {
      Linking.openURL(item.websiteUri);
    } else {
      alert('לאתר אין כתובת.');
    }
  };

  // 2. פונקציה לחיוג
  const handleCall = () => {
    if (item.nationalPhoneNumber) {
      Linking.openURL(`tel:${item.nationalPhoneNumber}`);
    } else {
      alert('לא ניתן לחייג למספר זה.');
    }
  };

  // 3. פונקציה לפתיחת מפה
  const handleOpenGoogleMaps = () => {
    if (item.googleMapsUri) {
      Linking.openURL(item.googleMapsUri);
    } else {
      alert('אין קישור לגוגל מפות.');
    }
  };

  // 4. עיבוד רמת מחיר (PriceLevel) מגוגל
  const renderPriceLevel = (priceLevel) => {
    const priceLevels = {
      PRICE_LEVEL_INEXPENSIVE: 'זול',
      PRICE_LEVEL_MODERATE: 'בינוני',
      PRICE_LEVEL_EXPENSIVE: 'יקר',
      PRICE_LEVEL_VERY_EXPENSIVE: 'מאוד יקר',
    };

    const level = priceLevels[priceLevel];
    return level ? (
      <View style={styles.infoRow}>
        <Ionicons name="pricetag-outline" size={20} color="white" />
        <Text style={styles.infoText}>רמת מחיר: {level}</Text>
      </View>
    ) : null;
  };

  // 5. בדיקת האם המקום פתוח
  //    נניח ששמרת את regularOpeningHours כולל openNow, nextCloseTime וכו'
  const isOpen = item.regularOpeningHours?.openNow;
  const nextCloseTime = item.regularOpeningHours?.nextCloseTime;

  // פונקציה לעיצוב פורמט שעה 
  const formatTime = (time) => {
    if (!time) return null;
    // מניחים ש-time הוא string המתאר זמן ISO או דומה
    // אם זה שונה, יש להתאים
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // 6. בחירת תמונה רקע (אם יש בכלל)
  //    לדוגמה, נשתמש ב-googleMapsUri של התמונה הראשונה אם קיים
  const backgroundImageUri =
    item.photos && item.photos.length > 0
      ? item.photos[0].googleMapsUri || ''
      : require('../../assets/restaurant.jpg');

  return (
    <View style={styles.container}>
      {/* רקע */}
      <ImageBackground
        source={{ uri: backgroundImageUri }}
        style={styles.imageBackground}
      >
        {/* אזור אייקוני הכותרת */}
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={onPress}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.actionIcons}>
            <Ionicons
              name="share-social"
              size={24}
              color="white"
              style={styles.iconSpacing}
            />
            <Ionicons name="ribbon" size={24} color="white" />
          </View>
        </View>

        {/* שכבת צבע חצי-שקופה */}
        <View style={styles.overlayContent}>
          <Text style={styles.title}>{item.name || 'ללא שם'}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating || 'לא דורג'}</Text>
            <Ionicons name="star" size={16} color="#FFD700" />
          </View>
        </View>
      </ImageBackground>

      {/* פרטי המקום */}
      <View style={styles.detailsContainer}>
        {/* קטגוריה (googleCategory) */}
        <Text style={styles.description}>
          {item.googleCategory || ''}
        </Text>

        {/* כתובת */}
        <TouchableOpacity onPress={handleOpenGoogleMaps}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="white" />
            <Text style={styles.infoText}>
              {item.formattedAddress || 'לא נמצא כתובת'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* טלפון */}
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color="white" />
          <TouchableOpacity onPress={handleCall}>
            <Text style={styles.infoText}>
              {item.nationalPhoneNumber || 'לא ידוע'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* שעות פעילות */}
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="white" />
          <Text style={styles.infoText}>
            {isOpen
              ? `פתוח${nextCloseTime ? ` עד ${formatTime(nextCloseTime)}` : ''}`
              : 'סגור'}
          </Text>
        </View>

        {/* רמת מחיר */}
        {renderPriceLevel(item.priceLevel)}

        {/* אתר אינטרנט */}
        <View style={styles.infoRow}>
          <Ionicons name="globe-outline" size={20} color="white" />
          <TouchableOpacity onPress={handleOpenWebsite}>
            <Text style={styles.infoText}>אתר האינטרנט</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* כפתור פעולה (דוגמה) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('הזמנה נשלחה')}
      >
        <Text style={styles.buttonText}>הזמנה</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 10,
  },
  imageBackground: {
    height: 200,
    justifyContent: 'space-between',
    padding: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIcons: {
    flexDirection: 'row',
  },
  iconSpacing: {
    marginHorizontal: 5,
  },
  overlayContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  },
  detailsContainer: {
    padding: 15,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});


// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   Linking,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// export default function ResultItem({ item, onPress }) {
//   //console.log(item.photos[0].authorAttributions[0].photoUri)
//   const handleOpenWebsite = () => {
//     if (item.websiteUri) {
//       Linking.openURL(item.websiteUri);
//     } else {
//       alert('לאתר אין כתובת.');
//     }
//   };

//   const handleCall = () => {
//     if (item.nationalPhoneNumber) {
//       Linking.openURL(`tel:${item.nationalPhoneNumber}`);
//     } else {
//       alert('לא ניתן לחייג למספר זה.');
//     }
//   };

//   const handleOpenGoogleMaps = () => {
//     if (item.googleMapsUri) {
//       Linking.openURL(item.googleMapsUri);
//     } else {
//       alert('אין קישור לגוגל מפות.');
//     }
//   };

//   const renderPriceLevel = (priceLevel) => {
//     const priceLevels = {
//       PRICE_LEVEL_INEXPENSIVE: 'זול',
//       PRICE_LEVEL_MODERATE: 'בינוני',
//       PRICE_LEVEL_EXPENSIVE: 'יקר',
//       PRICE_LEVEL_VERY_EXPENSIVE: 'מאוד יקר',
//     };

//     const level = priceLevels[priceLevel];

//     return level ? (
//       <View style={styles.infoRow}>
//         <Ionicons name="pricetag-outline" size={20} color="white" />
//         <Text style={styles.infoText}>רמת מחיר: {level}</Text>
//       </View>
//     ) : null;
//   };

//   const isOpen = item.regularOpeningHours?.openNow;
//   const nextCloseTime = item.regularOpeningHours?.nextCloseTime;

//   const formatTime = (time) => {
//     if (!time) return null;
//     const date = new Date(time);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={{ uri:  "" }}
//         style={styles.imageBackground}
//       >
//         <View style={styles.headerIcons}>
//           <TouchableOpacity onPress={onPress}>
//             <Ionicons name="arrow-back" size={24} color="white" />
//           </TouchableOpacity>
//           <View style={styles.actionIcons}>
//             <Ionicons name="share-social" size={24} color="white" style={styles.iconSpacing} />
//             <Ionicons name="ribbon" size={24} color="white" />
//           </View>
//         </View>
//         <View style={styles.overlayContent}>
//           <Text style={styles.title}>{item.displayName?.text || 'ללא שם'}</Text>
//           <View style={styles.ratingContainer}>
//             <Text style={styles.ratingText}>{item.rating || 'לא דורג'}</Text>
//             <Ionicons name="star" size={16} color="#FFD700" />
//           </View>
//         </View>
//       </ImageBackground>

//       <View style={styles.detailsContainer}>
//         <Text style={styles.description}>{item.primaryTypeDisplayName?.text || ''}</Text>
//         <TouchableOpacity onPress={handleOpenGoogleMaps}>
//           <View style={styles.infoRow}>
//             <Ionicons name="location-outline" size={20} color="white" />
//             <Text style={styles.infoText}>{item.formattedAddress || 'לא נמצא כתובת'}</Text>
//           </View>
//         </TouchableOpacity>
//         <View style={styles.infoRow}>
//           <Ionicons name="call-outline" size={20} color="white" />
//           <TouchableOpacity onPress={handleCall}>
//             <Text style={styles.infoText}>{item.nationalPhoneNumber || 'לא ידוע'}</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.infoRow}>
//           <Ionicons name="time-outline" size={20} color="white" />
//           <Text style={styles.infoText}>{isOpen ? `פתוח${nextCloseTime ? ` עד ${formatTime(nextCloseTime)}` : ''}` : 'סגור'}</Text>
//         </View>
//         {renderPriceLevel(item.priceLevel)}
//         <View style={styles.infoRow}>
//           <Ionicons name="globe-outline" size={20} color="white" />
//           <TouchableOpacity onPress={handleOpenWebsite}>
//             <Text style={styles.infoText}>אתר האינטרנט</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={() => alert('הזמנה נשלחה')}>
//         <Text style={styles.buttonText}>הזמנה</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     borderRadius: 15,
//     overflow: 'hidden',
//     marginVertical: 10,
//   },
//   imageBackground: {
//     height: 200,
//     justifyContent: 'space-between',
//     padding: 10,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   actionIcons: {
//     flexDirection: 'row',
//   },
//   iconSpacing: {
//     marginHorizontal: 5,
//   },
//   overlayContent: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     borderRadius: 10,
//     padding: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   ratingText: {
//     fontSize: 16,
//     color: 'white',
//     marginRight: 5,
//   },
//   detailsContainer: {
//     padding: 15,
//   },
//   description: {
//     fontSize: 16,
//     color: 'white',
//     marginBottom: 5,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   infoText: {
//     fontSize: 14,
//     color: 'white',
//     marginLeft: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     margin: 15,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

