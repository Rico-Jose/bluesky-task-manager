import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const retrieveUsers = () => {
    axios.get('api/users').then((res) => {
      console.log(res.data.users);
    });
  };

  const retrieveTasks = () => {
    axios.get('api/todos').then((res) => {
      console.log(res.data.todos);
    });
  };

  // Run the hook on mount
  useEffect(() => {
    retrieveUsers();
    retrieveTasks();
  }, []);

  return (
    <div className="App">
      <h2>Task Manager</h2>
    </div>
  );
}

export default App;
