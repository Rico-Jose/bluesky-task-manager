import React, { useState } from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import { UserProvider } from '../contexts/UserContext';
import Header from '../components/Header';
import Tasks from '../pages/Tasks/Tasks';
import TaskTable from '../components/TaskTable';
import AddTask from '../components/AddTask';
import {
  CssBaseline,
  makeStyles,
  Button,
  createMuiTheme,
} from '@material-ui/core';
//  import 'bootstrap/dist/css/bootstrap.min.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126',
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  /* shape: {
    borderRadius: '12px',
  }, */
});

const useStyles = makeStyles({
  appMain: {
    /* paddingLeft: '320px', */
    width: '100%',
  },
});

function App() {
  const classes = useStyles();

  const [openAddTask, setOpenAddTask] = useState(false);

  const handleClickOpenAddTask = () => {
    setOpenAddTask(true);
  };

  const handleCloseAddTask = (isAdd: boolean) => {
    setOpenAddTask(false);
  };

  return (
    <>
      <div className={classes.appMain}>
        <Header />
        <TaskProvider>
          <UserProvider>
            <Tasks />
          </UserProvider>
        </TaskProvider>
        {/* <TaskProvider>
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
                <AddTask
                  openAddTask={openAddTask}
                  onClose={handleCloseAddTask}
                />
              </main>
            </div>
          </UserProvider>
        </TaskProvider> */}
        <CssBaseline />
      </div>
    </>
  );
}

export default App;
