import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UsersDropdown from './UsersDropdown';
import { Grid, Paper, TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const EditTask = (props: any) => {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 380,
    margin: '20px auto',
  };

  const btnStyle = { margin: '8px 0' };

  const [name, setName] = useState(props.location.state.task.name);
  const [user, setUser] = useState(props.location.state.task.user);
  const [isComplete, setIsComplete] = useState(
    props.location.state.task.isComplete
  );

  const update = (e: any) => {
    // Don't refresh page
    e.preventDefault();

    const task = {
      id: props.location.state.task.id,
      name: name,
      user: user,
      isComplete: isComplete,
    };

    // Pass data to parent component
    props.editTaskHandler(task);

    // Reset values
    setName('');
    setUser('');
    setIsComplete(false);

    // Go to back the home page
    props.history.push('/');
  };

  const getUserId = (id: any) => {
    setUser(id);
  };

  return (
    <form onSubmit={update}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid container justify="center">
            <h2>Edit Task</h2>
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
          <UsersDropdown
            users={props.users}
            getUserId={getUserId}
            user={user}
          />
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
            Update
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

export default EditTask;
