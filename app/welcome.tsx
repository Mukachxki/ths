import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

export default function Welcome(): JSX.Element {
  const { fullName, email, idNumber, course, phoneNumber } = useLocalSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      alert(`Logout Failed: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
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

      
      <View style={styles.horizontalButtons}>
        <Button title="Welcome" onPress={() => router.push('./welcome')} />
        <Button title="Home" onPress={() => router.push('./home')} />
        <Button title="Request" onPress={() => router.push('./request')} />
      </View>

      
      <View style={styles.logoutButton}>
        <Button title="Log Out" onPress={handleLogout} />
      </View>
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
  horizontalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '80%',
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
