// app/ticket-detail.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function TicketDetailScreen() {
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Детали вашего билета</Text>
      <Text style={styles.detail}>Отправление: {params.departure}</Text>
      <Text style={styles.detail}>Назначение: {params.destination}</Text>
      <Text style={styles.detail}>Дата: {params.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  detail: { fontSize: 18, marginVertical: 4 },
});
