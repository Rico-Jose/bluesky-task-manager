import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import TaskDetail from './components/TaskDetail';
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
    const temp = parseInt(tasks[tasks.length - 1].id) + 1;
    setTasks([...tasks, { id: temp.toString(), ...task }]);
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
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <TaskList
                  {...props}
                  tasks={tasks}
                  getTaskId={deleteTaskHandler}
                />
              )}
            />
            <Route
              path="/add"
              render={(props) => (
                <AddTask {...props} addTaskHandler={addTaskHandler} />
              )}
            />
            <Route path="/task" component={TaskDetail} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
