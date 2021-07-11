import React, { useEffect, useState } from 'react';
import {
  useTask,
  useAddTask,
  useEditTask,
  useDeleteTask,
} from '../../contexts/TaskContext';
import { useUser } from '../../contexts/UserContext';
import TaskForm from './TaskForm';
import PageHeader from '../../components/PageHeader';
import Controls from '../../components/controls/Controls';
import useTable from '../../components/useTable';
import Popup from '../../components/Popup';
import Notification from '../../components/Notification';
import ConfirmDialog from '../../components/ConfirmDialog';
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  makeStyles,
  Grid,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
} from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  search: {
    width: '80%',
    margin: 8,
  },
  isComplete: {
    width: '80%',
    marginTop: 8,
    marginLeft: 80,
  },
  newButton: {
    marginTop: 12,
    marginLeft: 80,
  },
  tableRow: {
    '& .MuiTableCell-body:nth-child(n + 2)': {
      textAlign: 'center',
    },
  },
  noRecords: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
}));

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'user', label: 'User' },
  { id: 'isComplete', label: 'Completed' },
  { id: 'actions', label: 'Actions' },
];

export default function Tasks() {
  const classes = useStyles();
  const tasks = useTask();
  const users = useUser();
  const addTask = useAddTask();
  const editTask = useEditTask();
  const deleteTask = useDeleteTask();
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [user, setUser] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [funcName, setFuncName] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: () => {},
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [openPopup, setOpenPopup] = useState(false);

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

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleSearch = (e: any) => {
    let targetValue = e.target.value;
    let targetType = e.target.type;
    let type = e.type;
    // console.log(targetValue);
    // console.log(targetType);
    // console.log(type);
    if (e.type === 'click') setUser(targetValue);
    if (targetType === 'checkbox') setIsComplete(!isComplete);
    setFilterFn({
      fn: (items: any) => {
        if (targetValue) {
          if (type === 'change') {
            console.log('search');
            return items.filter((x: any) =>
              x.name.toLowerCase().includes(targetValue)
            );
          } else if (type === 'click') {
            console.log('user');
            return items.filter((x: any) => x.user === targetValue);
          }
        } else {
          if (targetType === 'checkbox' && isComplete === false) {
            console.log('checkbox');
            return items.filter((x: any) => x.isComplete === !isComplete);
          }
          console.log('items');
          return items;
          //console.log('user');
          //return _.filter(users, (x: any) => x.isComplete === !isComplete);
          //return items.filter((x: any) => x.isComplete === !isComplete);
        }
      },
    });
  };

  // const handleFilterByUser = (e: any) => {
  //   let value = e.target.value;
  //   setUser(value);
  //   setFilterFn({
  //     fn: (items: any) => {
  //       if (!value) {
  //         return items;
  //       } else {
  //         return items.filter((x: any) => x.user === value);
  //       }
  //     },
  //   });
  // };

  // const handleFilterByIsComplete = () => {
  //   setIsComplete(!isComplete);
  //   setFilterFn({
  //     fn: (items: any) => {
  //       if (isComplete) {
  //         return items;
  //       } else {
  //         return items.filter((x: any) => x.isComplete === !isComplete);
  //       }
  //     },
  //   });
  // };

  const addOrEdit = (task: any, resetForm: any) => {
    if (!task.id) addTask(task);
    else editTask(task);
    resetForm();
    setTaskToEdit(null);
    setOpenPopup(false);
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success',
    });
  };

  const openInPopup = (task: any) => {
    setFuncName('Update Task');
    setTaskToEdit(task);
    setOpenPopup(true);
    setFuncName('Add Task');
  };

  const onDelete: any = (id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteTask(id);
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    });
  };

  const handleSetFuncName = (funcName: string) => {
    setFuncName(funcName);
  };

  return (
    <>
      <PageHeader title="Tasks" icon={<FormatListBulletedIcon />} />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Grid container>
            <Grid item xs={4}>
              <FormControl className={classes.search}>
                <Controls.Input
                  label="Search Tasks"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearch}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl className={classes.search}>
                <Controls.Select
                  name="user"
                  label="User"
                  value={user}
                  onChange={handleSearch}
                  options={users}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl className={classes.isComplete}>
                <FormGroup style={{ margin: 10 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isComplete}
                        onChange={handleSearch}
                        color="primary"
                      />
                    }
                    label="Completed"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl className={classes.newButton}>
                <Controls.Button
                  text="Add New"
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setOpenPopup(true);
                    setTaskToEdit(null);
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {tasksAfterPaging().map((task: any) => (
              <TableRow key={task.id} className={classes.tableRow}>
                <TableCell>{task.name}</TableCell>
                <TableCell>
                  {getUsername(task.user).firstName}{' '}
                  {getUsername(task.user).lastName}
                </TableCell>
                <TableCell>
                  {task.isComplete && (
                    <CheckCircleIcon style={{ color: green[500] }} />
                  )}
                </TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(task);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() =>
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this task?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(task.id);
                        },
                      })
                    }
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        {!tasksAfterPaging().length && (
          <Typography variant="h4" className={classes.noRecords}>
            No Records Found
          </Typography>
        )}
        <TblPagination />
      </Paper>
      <Popup title={funcName} openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <TaskForm
          taskToEdit={taskToEdit}
          addOrEdit={addOrEdit}
          handleSetFuncName={handleSetFuncName}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
