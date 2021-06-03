import React from 'react';
import { TaskProvider } from '../contexts/TaskContext';

export default function App() {
  return (
    <TaskProvider>
      <h2>Hellos</h2>
    </TaskProvider>
  );
}
