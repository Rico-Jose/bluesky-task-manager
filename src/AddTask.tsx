import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UsersDropdown from './components/UsersDropdown';
import { Grid, Paper, TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const AddTask = (props: any) => {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 380,
    margin: '20px auto',
  };

  const btnStyle = { margin: '8px 0' };

  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const add = (e: any) => {
    //  Don't refresh page
    e.preventDefault();

    const task = {
      name: name,
      user: user,
      isComplete: isComplete,
    };

    //  Pass data to parent component
    props.addTaskHandler(task);

    //  Reset values
    setName('');
    setUser('');
    setIsComplete(false);

    //  Go to back the home page
    props.history.push('/');
  };

  const getUserId = (id: any) => {
    setUser(id);
  };

  return (
    <form onSubmit={add}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid container justify="center">
            <h2>Add Task</h2>
          </Grid>
          <TextField
            label="Name"
            placeholder="Enter name"
            style={btnStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <UsersDropdown users={props.users} getUserId={getUserId} />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={isComplete}
                onChange={(e) => setIsComplete(e.currentTarget.checked)}
              />
            }
            style={btnStyle}
            label="Completed"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnStyle}
            fullWidth
          >
            Add
          </Button>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              style={btnStyle}
              fullWidth
            >
              Cancel
            </Button>
          </Link>
        </Paper>
      </Grid>
    </form>
  );
};

export default AddTask;
