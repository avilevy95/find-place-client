import React, { useContext ,useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AppButton from '../../components/UI/AppButton';
import { authService } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password); // Get user data
      login(userData); 
      Alert.alert('הצלחה', 'התחברת בהצלחה!');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('שגיאה', 'אימייל או סיסמה לא תקינים');
    } finally {
      setLoading(false);
    }
  };

  const isPasswordValid = password.length >= 6;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>היי! שמחים שחזרת</Text>

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
      {!isPasswordValid && <Text style={styles.error}>הסיסמה חייבת להיות לפחות 6 תווים</Text>}

      <AppButton title={loading ? 'טוען...' : 'כניסה'} onPress={handleLogin} disabled={loading} />

      <View style={{ marginVertical: 20 }}>
        <Text style={{ color: '#ccc', textAlign: 'center', marginBottom: 10 }}>התחברות מהירה</Text>
        <AppButton title="Google" onPress={() => {Alert.alert('קצת סבלנות', "הפיצ'ר בפיתוח..")}} style={{ backgroundColor: '#222' }} />
        <AppButton title="Apple" onPress={() => {Alert.alert('קצת סבלנות', "הפיצ'ר בפיתוח..")}} style={{ backgroundColor: '#222', marginTop: 10 }} />
      </View>

      <Text style={styles.footerText}>בכניסה אתם מסכימים לתנאי השימוש</Text>

      <Text
        style={styles.signUpText}
        onPress={() => navigation.navigate('SignUp')}
      >
        עוד לא נרשמת? הרשם עכשיו!
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
  signUpText: {
    color: '#007BFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
