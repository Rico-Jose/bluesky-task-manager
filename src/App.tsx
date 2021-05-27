import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TaskList from './components/TaskList';

function App() {
  const retrieveUsers = () => {
    axios.get('api/users').then((res) => {
      setUsers([...users, ...res.data.users]);
    });
  };

  const retrieveTasks = () => {
    axios.get('api/todos').then((res) => {
      setTasks([...tasks, ...res.data.todos]);
    });
  };

  const [users, setUsers] = useState<any>([]);
  const [tasks, setTasks] = useState<any>([]);

  // Run the hook on mount
  useEffect(() => {
    retrieveUsers();
    retrieveTasks();
  }, []);

  // Run the hook whenever users change
  useEffect(() => {
    console.log(users);
  }, [users]);

  // Run the hook whenever tasks change
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="App">
      <Header />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
