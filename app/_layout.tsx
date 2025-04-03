// app/_layout.tsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { TicketProvider } from '../contexts/TicketContext';

export default function RootLayout() {
  return (
    <TicketProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Slot />
      </SafeAreaView>
    </TicketProvider>
  );
}
