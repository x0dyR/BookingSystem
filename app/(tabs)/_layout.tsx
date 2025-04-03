// app/tabs/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Бронирование',
          tabBarIcon: () => null, // Можно добавить иконку, если потребуется
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Мои билеты',
          tabBarIcon: () => null, // Добавьте иконку при необходимости
        }}
      />
    </Tabs>
  );
}
