import React from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import { UserProvider } from '../contexts/UserContext';
import Header from './Header';
import TaskTable from './TaskTable';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div className="App">
      <Header />
      <TaskProvider>
        <UserProvider>
          <div className="container">
            <main>
              <TaskTable />
            </main>
          </div>
        </UserProvider>
      </TaskProvider>
    </div>
  );
}
