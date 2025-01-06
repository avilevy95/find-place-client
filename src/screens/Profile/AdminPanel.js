import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {feedbackService} from '../../services/feedbackService';

const AdminPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await feedbackService.getFeedbacks();
      console.log("data:   >>>",data)
      setFeedbacks(data);
    } catch (error) {
      Alert.alert('שגיאה', 'לא ניתן לטעון את הפידבקים');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('מחיקת פידבק', 'האם אתה בטוח שברצונך למחוק את הפידבק?', [
      { text: 'ביטול', style: 'cancel' },
      {
        text: 'מחק',
        style: 'destructive',
        onPress: async () => {
          try {
            await feedbackService.deleteFeedback(id);
            setFeedbacks((prev) => prev.filter((item) => item._id !== id));
          } catch (error) {
            Alert.alert('שגיאה', 'לא ניתן למחוק את הפידבק');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const renderFeedback = ({ item }) => (
    <View style={styles.feedbackCard}>
      <View style={styles.feedbackHeader}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString('he-IL')}
        </Text>
      </View>
      <Text style={styles.feedbackText}>{item.feedback}</Text>
      <FlatList
        data={item.screenshots}
        keyExtractor={(uri, index) => `${item._id}-${index}`}
        horizontal
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.screenshot} />
        )}
        contentContainerStyle={styles.imageContainer}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item._id)}
      >
        <MaterialIcons name="delete" size={20} color="#fff" />
        <Text style={styles.deleteButtonText}>מחק</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>אזור ניהול פידבקים</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => item._id}
          renderItem={renderFeedback}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#6200EE',
  },
  listContainer: {
    paddingBottom: 10,
  },
  feedbackCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  feedbackText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  screenshot: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default AdminPanel;
