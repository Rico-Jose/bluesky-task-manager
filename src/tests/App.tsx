import React from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import Header from './Header';
import TaskTable from './TaskTable';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div className="App">
      <TaskProvider>
        <Header />
        <div className="container">
          <main>
            <TaskTable />
          </main>
        </div>
      </TaskProvider>
    </div>
  );
}
