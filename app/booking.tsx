// app/booking.tsx
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { TicketContext, Ticket } from '../contexts/TicketContext';

export default function BookingScreen() {
  const router = useRouter();
  const { addTicket } = useContext(TicketContext);

  const [fullName, setFullName] = useState('');
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookedTicket, setBookedTicket] = useState<Ticket | null>(null);

  // Предопределённые временные слоты для бронирования
  const availableTimes = [
    '2025-04-15T06:00',
    '2025-04-15T08:00',
    '2025-04-15T10:00',
    '2025-04-15T12:00',
    '2025-04-15T14:00',
    '2025-04-15T16:00',
    '2025-04-15T18:00',
    '2025-04-15T20:00',
  ];

  // Валидация ФИО: минимум два слова, каждое не менее 2-х символов
  const isValidFullName = (name: string): boolean => {
    const words = name.trim().split(/\s+/);
    return words.length >= 2 && words.every(word => word.length >= 2);
  };

  const handleBooking = async () => {
    if (!fullName || !departure || !destination || !selectedTime) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    if (!isValidFullName(fullName)) {
      Alert.alert(
        'Ошибка',
        'Введите корректное ФИО. ФИО должно состоять минимум из двух слов, каждое не менее двух символов.'
      );
      return;
    }

    // Проверяем, что отправление и назначение не совпадают
    if (departure.trim().toLowerCase() === destination.trim().toLowerCase()) {
      Alert.alert('Ошибка', 'Отправление и назначение не могут быть одинаковыми.');
      return;
    }

    // Формируем новый билет с выбранным временем
    const newTicket: Ticket = {
      id: Date.now().toString(),
      fullName,
      departure,
      destination,
      date: selectedTime,
    };

    try {
      // Добавляем билет в глобальное состояние
      addTicket(newTicket);

      // Сохраняем билет в локальном состоянии для отображения на экране
      setBookedTicket(newTicket);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось забронировать билет');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.header}>Заполните данные для бронирования:</Text>
      <TextInput
        placeholder="ФИО"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Отправление"
        value={departure}
        onChangeText={setDeparture}
        style={styles.input}
      />
      <TextInput
        placeholder="Назначение"
        value={destination}
        onChangeText={setDestination}
        style={styles.input}
      />
      <Text style={styles.label}>Выберите время:</Text>
      <View style={styles.timeContainer}>
        {availableTimes.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedTimeButton,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text
              style={
                selectedTime === time
                  ? styles.selectedTimeText
                  : styles.timeText
              }
            >
              {time.slice(11)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Забронировать билет" onPress={handleBooking} />

      {/* Если билет забронирован, показываем его информацию и кнопку перехода */}
      {bookedTicket && (
        <View style={styles.ticketPreview}>
          <Text style={styles.previewHeader}>Билет успешно забронирован:</Text>
          <Text>ФИО: {bookedTicket.fullName}</Text>
          <Text>
            Маршрут: {bookedTicket.departure} ➜ {bookedTicket.destination}
          </Text>
          <Text>Время: {bookedTicket.date.slice(11)}</Text>
          <View style={styles.overviewButton}>
            <Button
              title="Перейти во вкладку 'Обзор'"
              onPress={() => router.push('/(tabs)/explore')}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  timeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTimeButton: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  timeText: {
    color: 'black',
  },
  selectedTimeText: {
    color: 'white',
  },
  ticketPreview: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#e0ffe0',
    borderRadius: 8,
  },
  previewHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overviewButton: {
    marginTop: 20,
  },
});
