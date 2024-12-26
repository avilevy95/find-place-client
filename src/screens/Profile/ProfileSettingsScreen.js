// src/screens/Profile/ProfileSettingsScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserContext } from '../../contexts/UserContext';
import AppButton from '../../components/UI/AppButton';

export default function ProfileSettingsScreen() {
  const { user } = useContext(UserContext);
  const [preferences, setPreferences] = useState({
    notifications: true, // Example preference
  });

  const handleSave = () => {
    // Simulate saving preferences
    console.log('Preferences saved:', preferences);
    alert('העדפות נשמרו בהצלחה!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הגדרות פרופיל</Text>

      <View style={styles.section}>
        <Text style={styles.label}>שם משתמש</Text>
        <TextInput
          style={styles.input}
          value={user?.name || ''}
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>קבל התראות</Text>
        <TextInput
          style={styles.input}
          value={preferences.notifications ? 'כן' : 'לא'}
          onChangeText={(value) => setPreferences({ ...preferences, notifications: value === 'כן' })}
        />
      </View>

      <AppButton title="שמור שינויים" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    color: '#ccc',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});
