import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AppButton from '../../components/UI/AppButton';
import { authService } from '../../services/authService';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await authService.register(name, email, password);
      Alert.alert('הצלחה', 'החשבון נוצר בהצלחה! ניתן להתחבר כעת.');
      navigation.navigate('Login'); // נווט למסך ההתחברות
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('שגיאה', 'נכשל ביצירת החשבון. נסו שוב.');
    } finally {
      setLoading(false);
    }
  };

  const isPasswordValid = password.length >= 6;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הצטרפו אלינו!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="שם מלא"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="אימייל משתמש"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={[styles.inputContainer, !isPasswordValid && { borderColor: 'red' }]}>
        <TextInput
          style={styles.input}
          placeholder="סיסמה"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {!isPasswordValid && <Text style={styles.error}>הסיסמה חייבת להיות 6 תווים לפחות</Text>}

      <AppButton title={loading ? 'טוען...' : 'הרשמה'} onPress={handleSignUp} disabled={loading} />

      <View style={{ marginVertical: 20 }}>
              <Text style={{ color: '#ccc', textAlign: 'center', marginBottom: 10 }}>הרשמה מהירה</Text>
              <AppButton title="Google" onPress={() => {Alert.alert('קצת סבלנות', "הפיצ'ר בפיתוח..")}} style={{ backgroundColor: '#222' }} />
              <AppButton title="Apple" onPress={() => {Alert.alert('קצת סבלנות', "הפיצ'ר בפיתוח..")}} style={{ backgroundColor: '#222', marginTop: 10 }} />
            </View>
      

      <Text style={styles.footerText}>בהרשמה אתם מסכימים לתנאי השימוש</Text>

      <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('Login')}
            >
              רשום כבר? היכנס עכשיו
            </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, color: '#fff', textAlign: 'center', marginBottom: 30 },
  inputContainer: { borderWidth: 1, borderColor: '#333', borderRadius: 10, marginBottom: 15 },
  input: { padding: 10, color: '#fff' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  footerText: { color: '#777', fontSize: 12, textAlign: 'center', marginTop: 20 },
});
