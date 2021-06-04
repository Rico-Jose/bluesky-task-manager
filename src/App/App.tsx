import React, { useState } from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import { UserProvider } from '../contexts/UserContext';
import Header from '../tests/Header';
import TaskTable from '../tests/TaskTable';
import AddTask from '../tests/AddTask';
import { CssBaseline, makeStyles, Button } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        </TaskProvider>
        <CssBaseline />
      </div>
    </>
  );
}

export default App;
