import React from 'react';
import { AppBar, Grid, Typography, makeStyles } from '@material-ui/core';
import BlueSkyLogo from '../images/BlueSky.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    transform: 'translateZ(0)',
    padding: 10,
    color: theme.palette.primary.main,
  },
  item: {
    textAlign: 'center',
  },
  logo: {
    marginLeft: 15,
    width: '40px',
    height: '40px',
  },
  /* item: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }, */
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <img src={BlueSkyLogo} className={classes.logo} />
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h4"
            component="h2"
            style={{ textAlign: 'center' }}
          >
            BlueSky Task Manager
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
