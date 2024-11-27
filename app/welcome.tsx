// app/welcome.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Correct hook for search params
import { auth } from '../firebaseConfig'; // Assuming auth is correctly initialized from firebaseConfig
import { useRouter } from 'expo-router';

export default function Welcome(): JSX.Element {
  const { fullName, email, idNumber, course, phoneNumber } = useLocalSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true); // New state to manage loading
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      if (!user.emailVerified) {
        setIsVerified(false);
        router.push('/verify');
      } else {
        setIsVerified(true);
      }
    } else {
      router.push('/login');
    }

    setLoading(false); 
  }, [router]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" /> {/* Show loading spinner */}
      </View>
    );
  }

  if (!isVerified) {
    return (
      <View style={styles.container}>
        <Text>Redirecting to email verification...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text>Full Name: {fullName}</Text>
      <Text>Email: {email}</Text>
      <Text>ID Number: {idNumber}</Text>
      <Text>Course: {course}</Text>
      <Text>Phone Number: {phoneNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
