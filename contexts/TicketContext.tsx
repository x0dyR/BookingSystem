// contexts/TicketContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { loadTickets, saveTickets } from '../serivces/storage';

export interface Ticket {
  id: string;
  fullName: string;
  departure: string;
  destination: string;
  date: string;
}

interface TicketContextData {
  bookedTickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
}

export const TicketContext = createContext<TicketContextData>({
  bookedTickets: [],
  addTicket: () => {},
});

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [bookedTickets, setBookedTickets] = useState<Ticket[]>([]);

  // Загружаем билеты из файла при старте приложения
  useEffect(() => {
    loadTickets().then((loadedTickets) => {
      setBookedTickets(loadedTickets);
    });
  }, []);

  const addTicket = (ticket: Ticket) => {
    setBookedTickets((prev) => {
      const updatedTickets = [...prev, ticket];
      saveTickets(updatedTickets); // сохраняем обновленный список в файл
      return updatedTickets;
    });
  };

  return (
    <TicketContext.Provider value={{ bookedTickets, addTicket }}>
      {children}
    </TicketContext.Provider>
  );
};
