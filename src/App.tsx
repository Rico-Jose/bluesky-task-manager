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
    setTasks([...tasks, { id: tasks.length + 1, ...task }]);
  };

  // Delete task
  const deleteTaskHandler = (id: any) => {
    const newTaskList = tasks.filter((task: any) => {
      return task.id !== id;
    });

    setTasks(newTaskList);
  };

  // Run the hook on mount
  useEffect(() => {
    retrieveUsers();
    retrieveTasks();
  }, []);

  // Run the hook whenever tasks change
  useEffect(() => {
    console.log(tasks);
    console.log(tasks.length);
  }, [tasks]);

  // Run the hook whenever users change
  /* useEffect(() => {
    console.log(users);
  }, [users]); */

  return (
    <div className="App">
      <Header />
      <div className="container">
        <AddTask addTaskHandler={addTaskHandler} />
        <TaskList tasks={tasks} getTaskId={deleteTaskHandler} />
      </div>
    </div>
  );
}

export default App;
