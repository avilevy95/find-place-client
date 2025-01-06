import React, { useState ,useContext} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { feedbackService } from "../services/feedbackService";
import { UserContext } from '../contexts/UserContext';

export default function FeedbackModal({ visible, onClose }) {
  const { userData } = useContext(UserContext);
  const [feedbackText, setFeedbackText] = useState("");
  const [images, setImages] = useState([]);

  const addImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const sendFeedback = async () => {
    if (!feedbackText.trim()) {
      Alert.alert("שגיאה", "נא להזין משוב לפני שליחה");
      return;
    }

    try {
      await feedbackService.sendFeedback({
        feedback: feedbackText,
        userName: userData?.userName || "משתמש",
        screenshots: images,
      });
      Alert.alert("הצלחה", "משוב נשלח בהצלחה");
      setFeedbackText("");
      setImages([]);
      onClose();
    } catch (error) {
      console.error("Failed to send feedback:", error);
      Alert.alert("שגיאה", "אירעה שגיאה בשליחת המשוב");
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>כתבו לנו משוב</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="כתבו את המשוב כאן..."
            placeholderTextColor="gray"
            multiline={true}
            value={feedbackText}
            onChangeText={setFeedbackText}
          />
          <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.imagePreview} />
            )}
            contentContainerStyle={styles.imageList}
          />
          <TouchableOpacity style={styles.addImageButton} onPress={addImage}>
            <Text style={styles.addImageButtonText}>+ הוסף תמונה</Text>
          </TouchableOpacity>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>ביטול</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={sendFeedback}>
              <Text style={styles.buttonText}>שליחה</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};



const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  feedbackInput: {
    width: "100%",
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: "top",
    padding: 10,
    marginBottom: 20,
  },
  imagePreview: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  },
  imageList: {
    flexDirection: "row",
    marginBottom: 10,
  },
  addImageButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addImageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
