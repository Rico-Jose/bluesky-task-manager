import React from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <TaskProvider>
      <Header />
      <h2>React</h2>
    </TaskProvider>
  );
}
