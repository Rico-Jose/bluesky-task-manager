import React from 'react';
import { AppBar, Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    transform: 'translateZ(0)',
    padding: 10,
    color: theme.palette.primary.main,
  },
  tryKo: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Grid container alignItems="center">
        <Grid className={classes.tryKo} item>
          <Typography variant="h4" component="h2">
            BlueSky Task Manager
          </Typography>
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
      {/* <header style={{ margin: '20px auto' }}>
          <h1></h1>
        </header> */}
    </AppBar>
  );
};

export default Header;
