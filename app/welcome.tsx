// app/welcome.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';

export default function Welcome() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/login'); // Redirect to login after logout
    } catch (error: unknown) {
      console.error('Logout error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halo</Text>
      <Button title="Logout" onPress={handleLogout} />
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
    textAlign: 'center',
  },
});
