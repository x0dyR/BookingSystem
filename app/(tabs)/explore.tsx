// app/tabs/explore.tsx
import React, { useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useRouter } from 'expo-router';
import TicketCard from '../../components/TicketCard';
import { TicketContext } from '../../contexts/TicketContext';

export default function ExploreScreen() {
  const { bookedTickets } = useContext(TicketContext);
  const router = useRouter();

  const handleSelectTicket = (ticket: any) => {
    router.push({
      pathname: '/ticket-detail',
      params: ticket,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      {bookedTickets.length === 0 ? (
        <Text style={{ margin: 16, fontSize: 16 }}>Нет забронированных билетов</Text>
      ) : (
        <FlatList
          data={bookedTickets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TicketCard ticket={item} onPress={() => handleSelectTicket(item)} />
          )}
          ListHeaderComponent={() => (
            <Text style={{ fontSize: 22, margin: 16 }}>Забронированные билеты</Text>
          )}
        />
      )}
    </View>
  );
}
