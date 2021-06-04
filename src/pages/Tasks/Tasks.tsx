import React, { useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { useUser } from '../../contexts/UserContext';
import PageHeader from '../../components/PageHeader';
import TaskForm from './TaskForm';
import Controls from '../../components/controls/Controls';
import useTable from '../../components/useTable';
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  makeStyles,
} from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Search from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
}));

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'user', label: 'User' },
];

export default function Tasks() {
  const classes = useStyles();
  const tasks = useTask();
  const users = useUser();
  const [filterFn, setFilterFn] = useState({
    fn: (items: any) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, tasksAfterPaging } = useTable(
    tasks,
    headCells,
    filterFn
  );

  const getUsername = (id: any): any => {
    return users.find((user: any) => {
      return user.id === id;
    });
  };

  const handleSearch = (e: any) => {
    let target = e.target;
    setFilterFn({
      fn: (items: any) => {
        if (target.value == '') return items;
        else
          return items.filter((x: any) =>
            x.name.toLowerCase().includes(target.value)
          );
      },
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
        {/* <TaskForm /> */}
        <Toolbar>
          <Controls.Input
            label="Search Tasks"
            classeName={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {tasksAfterPaging().map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{getUsername(item.user).firstName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
