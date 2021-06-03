import React from 'react';
import { useTask } from '../contexts/TaskContext';
import { useUser } from '../contexts/UserContext';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { green, red } from '@material-ui/core/colors';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

interface t {
  id: string;
  firstName: string;
  lastName: string;
}

export default function TaskTable() {
  const classes = useStyles();
  const tasks = useTask();
  const users = useUser();

  const ta = { id: '1', firstName: 'hey', lastName: 'asdf' };

  // remove t, users[0], ta
  const getUserName = (id: any): t => {
    return (
      users.find((user: any) => {
        return user.id === id;
      }) || ta
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">User</StyledTableCell>
            <StyledTableCell align="right">Completed</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task: any) => (
            <StyledTableRow key={task.name}>
              <StyledTableCell component="th" scope="row">
                {task.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {getUserName(task.user).firstName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {task.isComplete && (
                  <CheckCircleIcon style={{ color: green[500] }} />
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                <EditIcon />
                <DeleteForeverIcon style={{ color: red[700] }} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
