import React, { useState } from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import { UserProvider } from '../contexts/UserContext';
import Header from '../components/Header';
import Tasks from '../pages/Tasks/Tasks';
import {
  CssBaseline,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3a5eda',
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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
