import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const TaskDetail = (props: any) => {
  const { name, user, isComplete } = props.location.state.task;

  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 380,
    margin: '20px auto',
  };

  return (
    <main>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid container justify="center">
            <h2>{name}</h2>
          </Grid>
          <br />
          <Typography variant="h5">{user}</Typography>
          <br />
          {isComplete && <Typography variant="h5">Completed</Typography>}
          {!isComplete && <Typography variant="h5">Not Completed</Typography>}

          <Grid container justify="center">
            <Link
              to="/"
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  margin: '200px',
                }}
              >
                Back
              </Button>
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </main>
  );
};

export default TaskDetail;
