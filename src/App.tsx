import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import TaskDetail from './components/TaskDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState<any>([]);
  const [tasks, setTasks] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Retrieve users from the server
  const retrieveUsers = () => {
    axios.get('api/users').then((res) => {
      setUsers([...users, ...res.data.users]);
    });
  };

  // Retrieve todos from the server
  const retrieveTasks = async () => {
    const response = await axios.get('api/todos');
    return response.data.todos;
  };

  // Add task
  const addTaskHandler = async (task: any) => {
    const response = await axios.post('api/todo/create', { task });

    setTasks([
      ...tasks,
      { id: response.data.todo.id, ...response.data.todo.task },
    ]);
  };

  // Edit task
  const editTaskHandler = (task: any) => {
    setTasks(
      tasks.map((t: any) => {
        return t.id === task.id ? { ...task } : t;
      })
    );
  };

  // Delete task
  const deleteTaskHandler = async (id: any) => {
    await axios.delete(`api/todo/${id}/delete`);
    const newTaskList = tasks.filter((task: any) => {
      return task.id !== id;
    });

    setTasks(newTaskList);
  };

  const searchHandler = (searchTerm: any) => {
    console.log(searchTerm);
  };

  // Run the hook on mount
  useEffect(() => {
    const getAllTasks = async () => {
      const allTasks = await retrieveTasks();
      if (allTasks) setTasks(allTasks);
    };

    getAllTasks();
  }, []);

  // Run the hook whenever tasks change
  // useEffect(() => {
  //   console.log(tasks);
  //   console.log(tasks.length);
  // }, [tasks]);

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
                  term={searchTerm}
                  searchKeyword={searchHandler}
                />
              )}
            />
            <Route
              path="/add"
              render={(props) => (
                <AddTask {...props} addTaskHandler={addTaskHandler} />
              )}
            />
            <Route
              path="/edit"
              render={(props) => (
                <EditTask {...props} editTaskHandler={editTaskHandler} />
              )}
            />
            <Route path="/task/:id" component={TaskDetail} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
