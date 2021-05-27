import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  // Add task
  const addTaskHandler = (task: any) => {
    setTasks([...tasks, task]);
  };

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
      <div className="container">
        <AddTask addTaskHandler={addTaskHandler} />
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
