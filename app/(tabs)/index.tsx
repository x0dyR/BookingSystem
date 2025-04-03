// app/tabs/index.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Добро пожаловать в приложение для бронирования билетов!</Text>
      <Button title="Бронировать билет" onPress={() => router.push('/booking')} />
    </View>
  );
}