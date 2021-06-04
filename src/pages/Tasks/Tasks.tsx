import React from 'react';
import PageHeader from '../../components/PageHeader';
import TaskForm from './TaskForm';
import { Paper, makeStyles } from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function Tasks() {
  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="New Task"
        subTitle="Form design with validation"
        icon={<FormatListBulletedIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <TaskForm />
      </Paper>
    </>
  );
}
