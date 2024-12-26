import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Install if not already: expo install @expo/vector-icons
import { UserContext } from '../contexts/UserContext';
import { feedbackService } from '../services/feedbackService';

export default function Navbar({ navigation }) {
  const { user, logout } = useContext(UserContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  const submitFeedback = async() => {
    if (!feedbackText.trim()) {
      Alert.alert('שגיאה', 'נא להזין משוב לפני שליחה');
      return;
    }
    try {
      await feedbackService.sendFeedback(feedbackText);
      console.log('Feedback sent successfully');
      closeFeedbackModal();
    } catch (error) {
      console.error('Failed to send feedback:', error);
    }
  };



return (
  <View style={styles.container}>
    <View style={styles.navbarContent}>
      <TouchableOpacity
        style={styles.feedbackBubble}
        onPress={() => setFeedbackVisible(true)}
      >
        <MaterialIcons name="feedback" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.userContainer} onPress={toggleMenu}>
        <MaterialIcons name="person" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.userName}>{user?.userName || "משתמש"}</Text>
      </TouchableOpacity>


    </View>

    <Modal
      transparent={true}
      animationType="fade"
      visible={menuVisible}
      onRequestClose={() => setMenuVisible(false)}
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)} />
      <View style={styles.menuContainer}>
        <TouchableOpacity
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('ProfileSettings');
          }}
        >
          <Text style={styles.menuItem}>הגדרות פרופיל</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMenuVisible(false);
            handleLogout();
          }}
        >
          <Text style={styles.menuItem}>התנתק</Text>
        </TouchableOpacity>
      </View>
    </Modal>

    <Modal
      transparent={true}
      animationType="slide"
      visible={feedbackVisible}
      onRequestClose={() => setFeedbackVisible(false)}
    >
      <View style={styles.feedbackModalContainer}>
        <View style={styles.feedbackModalContent}>
          <Text style={styles.feedbackTitle}>כתבו לנו משוב</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="הקלידו את המשוב שלכם כאן"
            placeholderTextColor="#888"
            multiline
            value={feedbackText}
            onChangeText={setFeedbackText}
          />
          <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
            <Text style={styles.submitButtonText}>שלח</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setFeedbackVisible(false)}>
            <Text style={styles.cancelButtonText}>ביטול</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  navbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row-reverse', // האייקון מימין לטקסט
    alignItems: 'center',
    justifyContent: 'flex-start', // להזיח את כל התוכן לימין
  },
  icon: {
    marginLeft: 8,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
  },
  feedbackBubble: {
    // backgroundColor: '#007bff',
    // width: 50,
    // height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 60,
    right: 15,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
    width: 150,
    zIndex: 10,
  },
  menuItem: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
    textAlign: 'center',
  },
  feedbackModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  feedbackModalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
