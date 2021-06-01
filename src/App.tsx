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
  const [userFilter, setUserFilter] = useState(null);
  const [userFilterResults, setUserFilterResults] = useState([]);

  //  Retrieve users from the server
  const retrieveUsers = async () => {
    //  GET api/users
    const response = await axios.get('api/users');
    return response.data.users;
  };

  //  Retrieve todos from the server
  const retrieveTasks = async () => {
    //  GET api/todos
    const response = await axios.get('api/todos');
    return response.data.todos;
  };

  //  Add task
  const addTaskHandler = async (task: any) => {
    //  POST api/todo/create
    const response = await axios.post('api/todo/create', { task });
    //  Add new task to the UI
    setTasks([
      ...tasks,
      { id: response.data.todo.id, ...response.data.todo.task },
    ]);
  };

  //  Edit task
  const editTaskHandler = (task: any) => {
    //  Edit task in UI
    setTasks(
      tasks.map((t: any) => {
        return t.id === task.id ? { ...task } : t;
      })
    );
  };

  //  Delete task
  const deleteTaskHandler = async (id: any) => {
    //  DELETE api/todo/:id/delete
    await axios.delete(`api/todo/${id}/delete`);
    //  Delete task in UI
    setTasks(
      tasks.filter((task: any) => {
        return task.id !== id;
      })
    );
  };

  //  Filter by name
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

  //  Filter by completed
  const buttonHandler = (isComplete: any) => {
    setIsCompleteButton(isComplete);
    if (isComplete) {
      const newTaskList = tasks.filter((task: any) => {
        return task.isComplete === isComplete;
      });
      setIsCompleteResults(newTaskList);
    } else {
      setIsCompleteResults(tasks);
    }
  };

  //  Filter by user
  const userFilterHandler = (userId: any) => {
    setUserFilter(userId);
    if (userId) {
      const newTaskList = tasks.filter((task: any) => {
        return task.user === userId;
      });
      setUserFilterResults(newTaskList);
    } else {
      setUserFilterResults(tasks);
    }
  };

  const combinedFilters = () => {
    if (searchTerm.length < 1 && !isCompleteButton && !userFilter) {
      return tasks;
    } else if (!isCompleteButton && !userFilter) {
      return searchResults;
    } else if (searchTerm.length < 1 && !isCompleteButton) {
      return userFilterResults;
    } else if (searchTerm.length < 1 && !userFilter) {
      return isCompleteResults;
    } else {
      return tasks;
    }
  };

  //  Run the hook on mount
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
                  tasks={combinedFilters()}
                  getTaskId={deleteTaskHandler}
                  term={searchTerm}
                  searchKeyword={searchHandler}
                  isCompleteFilter={isCompleteButton}
                  getFilter={buttonHandler}
                  users={users}
                  getUserFilter={userFilterHandler}
                />
              )}
            />
            <Route
              path="/add"
              render={(props) => (
                <AddTask
                  {...props}
                  addTaskHandler={addTaskHandler}
                  users={users}
                />
              )}
            />
            <Route
              path="/edit"
              render={(props) => (
                <EditTask
                  {...props}
                  editTaskHandler={editTaskHandler}
                  users={users}
                />
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
