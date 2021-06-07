import React from 'react';
import { Paper, Card, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: '#fdfdff', color: theme.palette.primary.main },
  pageHeader: {
    padding: theme.spacing(2),
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  pageTitle: {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
  },
}));

export default function PageHeader(props: any) {
  const classes = useStyles();
  const { title, subTitle, icon } = props;

  return (
    <Paper className={classes.root} elevation={0} square>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}> {icon} </Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
