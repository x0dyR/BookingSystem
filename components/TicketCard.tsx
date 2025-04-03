// components/TicketCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TicketCardProps {
  ticket: {
    id: string;
    departure: string;
    destination: string;
    date: string;
  };
  onPress: () => void;
}

export default function TicketCard({ ticket, onPress }: TicketCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>
        {ticket.departure} ➜ {ticket.destination}
      </Text>
      <Text style={styles.date}>Дата: {ticket.date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
