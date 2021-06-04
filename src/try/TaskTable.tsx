import React, { useState } from 'react';
import DeleteAlert from './DeleteAlert';
import DeleteSuccessSnackbar from './DeleteSuccessSnackbar';
import { Link } from 'react-router-dom';
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

export default function TaskTable(props: any) {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [taskId, setTaskId] = useState('');

  const getUserName = (id: any) => {
    return props.users.length > 0
      ? props.users.find((user: any) => {
          return user.id === id;
        })
      : '';
  };

  const handleClickOpen = (taskId: string) => {
    setTaskId(taskId);
    setOpenAlert(true);
  };

  const handleCloseAlert = (isDelete: boolean) => {
    setOpenAlert(false);
    if (isDelete) {
      props.getTaskId(taskId);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          {props.tasks.map((task: any) => (
            <StyledTableRow key={task.name}>
              <StyledTableCell component="th" scope="row">
                <Link
                  to={{
                    pathname: `/task/${task.id}`,
                    state: { task: task },
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  {task.name}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                {`${getUserName(task.user).firstName} ${
                  getUserName(task.user).lastName
                }`}
              </StyledTableCell>
              <StyledTableCell align="right">
                {task.isComplete && (
                  <CheckCircleIcon style={{ color: green[500] }} />
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Link to={{ pathname: `/edit`, state: { task: task } }}>
                  <EditIcon />
                </Link>
                <DeleteForeverIcon
                  style={{ color: red[700] }}
                  onClick={() => handleClickOpen(task.id)}
                />
                <DeleteAlert open={openAlert} onClose={handleCloseAlert} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {props.tasks.length < 1 ? (
        <h2 style={{ margin: '20px', textAlign: 'center' }}>
          No Tasks Available
        </h2>
      ) : null}
      <DeleteSuccessSnackbar
        openSnackbar={openSnackbar}
        onClose={handleCloseSnackbar}
      />
    </TableContainer>
  );
}
