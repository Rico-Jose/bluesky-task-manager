import React, { useState } from 'react';
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
    // Don't refresh page
    e.preventDefault();

    if (!name || !user) {
      alert('Name and User are required');
      return;
    }

    const task = {
      name: name,
      user: user,
      isComplete: isComplete,
    };

    // Pass data to parent component
    props.addTaskHandler(task);

    // Reset values
    setName('');
    setUser('');
    setIsComplete(false);

    // Go to back the home page
    props.history.push('/');
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
          <TextField
            label="User"
            placeholder="Enter user"
            type="password"
            style={btnStyle}
            value={user}
            onChange={(e) => setUser(e.target.value)}
            fullWidth
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
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
        </Paper>
      </Grid>
    </form>
  );
};

export default AddTask;
/* import React, { useState } from 'react';

const AddTask = (props: any) => {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const add = (e: any) => {
    // Don't refresh page
    e.preventDefault();

    if (!name || !user) {
      alert('Name and User are required');
      return;
    }

    const task = {
      name: name,
      user: user,
      isComplete: isComplete,
    };

    // Pass data to parent component
    props.addTaskHandler(task);

    // Reset values
    setName('');
    setUser('');
    setIsComplete(false);

    // Go to back the home page
    props.history.push('/');
  };

  return (
    <>
      <h2 className="m-3">Add Task</h2>
      <form onSubmit={add}>
        <div className="form-group m-3">
          <label className="mb-3">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group m-3">
          <label className="mb-3">User</label>
          <input
            type="text"
            className="form-control"
            name="user"
            value={user}
            placeholder="User"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group form-check m-3 pt-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.currentTarget.checked)}
          />
          <label className="form-check-label">Completed</label>
        </div>
        <button type="submit" className="btn btn-primary m-3">
          Add
        </button>
      </form>
    </>
  );
};

export default AddTask;
 */
