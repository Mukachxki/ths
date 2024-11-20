// app/signup.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const router = useRouter();

  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const sendVerificationCode = async () => {
    const code = generateCode();
    setGeneratedCode(code);

    try {
      // Simulating email send (replace with actual email service)
      Alert.alert('Verification Code Sent', `Code: ${code}`);
      setCodeSent(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error Sending Code', error.message);
      }
    }
  };

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (verificationCode !== generatedCode) {
      Alert.alert('Invalid Code', 'Please enter the correct verification code.');
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // Normally, you’d also store the first and last name in your database here
      router.push('/welcome'); // Redirect to welcome page after signup
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Signup Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="Send Code" onPress={sendVerificationCode} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {codeSent && (
        <TextInput
          style={styles.input}
          placeholder="Enter Verification Code"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="numeric"
        />
      )}
      <Button title="Sign Up" onPress={handleSignup} />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flex: {
    flex: 1,
    marginRight: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
