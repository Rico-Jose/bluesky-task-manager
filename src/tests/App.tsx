import React, { useState } from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import { UserProvider } from '../contexts/UserContext';
import Header from './Header';
import TaskTable from './TaskTable';
import AddTask from './AddTask';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [openAddTask, setOpenAddTask] = useState(false);

  const handleClickOpenAddTask = () => {
    setOpenAddTask(true);
  };

  const handleCloseAddTask = (isAdd: boolean) => {
    setOpenAddTask(false);
  };

  return (
    <div className="App">
      <Header />
      <TaskProvider>
        <UserProvider>
          <div className="container">
            <main>
              <TaskTable />
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpenAddTask}
              >
                Add Task
              </Button>
              <AddTask openAddTask={openAddTask} onClose={handleCloseAddTask} />
            </main>
          </div>
        </UserProvider>
      </TaskProvider>
    </div>
  );
}
