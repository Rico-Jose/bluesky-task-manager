import React from 'react';
import { useTask } from '../../contexts/TaskContext';
import { useUser } from '../../contexts/UserContext';
import PageHeader from '../../components/PageHeader';
import TaskForm from './TaskForm';
import useTable from '../../components/useTable';
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function Tasks() {
  const classes = useStyles();
  const { TblContainer } = useTable();
  const tasks = useTask();
  const users = useUser();

  const getUserName = (id: any): any => {
    return users.find((user: any) => {
      return user.id === id;
    });
  };

  return (
    <>
      <PageHeader
        title="New Task"
        subTitle="Form design with validation"
        icon={<FormatListBulletedIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <TaskForm />
        <TblContainer>
          <TableBody>
            {tasks.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{getUserName(item.user).firstName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </Paper>
    </>
  );
}
