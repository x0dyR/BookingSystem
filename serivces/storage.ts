// services/storage.ts
import * as FileSystem from 'expo-file-system';
import { Ticket } from '../contexts/TicketContext';

// Путь к файлу для хранения билетов
const fileUri = FileSystem.documentDirectory + 'tickets.json';

export async function loadTickets(): Promise<Ticket[]> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      // Файл не существует, возвращаем пустой массив
      return [];
    }
    const data = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(data);
  } catch (error) {
    console.error('Ошибка при загрузке билетов', error);
    return [];
  }
}

export async function saveTickets(tickets: Ticket[]): Promise<void> {
  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(tickets));
  } catch (error) {
    console.error('Ошибка при сохранении билетов', error);
  }
}
