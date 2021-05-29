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
  const [searchResults, setSearchResults] = useState([]);
  const [isCompleteButton, setIsCompleteButton] = useState(false);
  const [isCompleteResults, setIsCompleteResults] = useState([]);

  // Retrieve users from the server
  const retrieveUsers = async () => {
    const response = await axios.get('api/users');
    return response.data.users;
    // axios.get('api/users').then((res) => {
    //   setUsers([...users, ...res.data.users]);
    // });
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
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const newTaskList = tasks.filter((task: any) => {
        return Object.values(task)
          .join(' ')
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });
      setSearchResults(newTaskList);
    } else {
      setSearchResults(tasks);
    }
  };

  const buttonHandler = (e: any) => {
    setIsCompleteButton(e);
    if (e) {
      const newTaskList = tasks.filter((task: any) => {
        return task.isComplete === e;
      });
      setIsCompleteResults(newTaskList);
    } else {
      setIsCompleteResults(tasks);
    }
  };

  // Run the hook on mount
  useEffect(() => {
    const getAllTasks = async () => {
      const allTasks = await retrieveTasks();
      if (allTasks) setTasks(allTasks);
    };

    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUsers(allUsers);
    };

    getAllTasks();
    getAllUsers();
  }, []);

  // Run the hook whenever tasks change
  useEffect(() => {
    console.log(tasks);
    console.log(tasks.length);
  }, [tasks]);

  // Run the hook whenever users change
  useEffect(() => {
    console.log(users);
    console.log(users.length);
  }, [users]);

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
                  //tasks={searchTerm.length < 1 ? tasks : searchResults}
                  //tasks={!isCompleteButton ? tasks : isCompleteResults}
                  tasks={
                    searchTerm.length < 1 && !isCompleteButton
                      ? tasks
                      : !isCompleteButton
                      ? searchResults
                      : isCompleteResults
                  }
                  getTaskId={deleteTaskHandler}
                  term={searchTerm}
                  searchKeyword={searchHandler}
                  isCompleteFilter={isCompleteButton}
                  getFilter={buttonHandler}
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
