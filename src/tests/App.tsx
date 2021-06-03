import React from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import { UserProvider } from '../contexts/UserContext';

export default function App() {
  return (
    <TaskProvider>
      <h2>Hellos</h2>
    </TaskProvider>
  );
}
