import React from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  makeStyles,
  InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: '#fff' },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': { backgroundColor: '#f2f2f2' },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              className={classes.searchInput}
              placeholder="Search names"
              startAdornment={<SearchIcon fontSize="small" />}
            />
          </Grid>
          <Grid item></Grid>
          <Grid item></Grid>
          {/* <Typography variant="h4" component="h2">
            BlueSky Task Manager
          </Typography> */}
        </Grid>
        {/* <header style={{ margin: '20px auto' }}>
          <h1></h1>
        </header> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
