// app/not-found.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFound() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Страница не найдена!</Text>
      <Button title="Вернуться домой" onPress={() => router.push('/(tabs)/explore')} />
    </View>
  );
}
