import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Correct hook for search params

export default function Welcome(): JSX.Element {
  const { fullName, email, idNumber, course } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text>Full Name: {fullName}</Text>
      <Text>Email: {email}</Text>
      <Text>ID Number: {idNumber}</Text>
      <Text>Course: {course}</Text>
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
