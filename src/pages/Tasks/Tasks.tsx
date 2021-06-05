import React, { useState } from 'react';
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
} from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
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
    setTaskToEdit(task);
    setOpenPopup(true);
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

  return (
    <>
      <PageHeader
        title="New Task"
        subTitle="Form design with validation"
        icon={<FormatListBulletedIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            className={classes.searchInput}
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
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setTaskToEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {tasksAfterPaging().map((task: any) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>
                  {getUsername(task.user).firstName}{' '}
                  {getUsername(task.user).lastName}
                </TableCell>
                <TableCell>
                  {task.isComplete && <CheckCircleIcon fontSize="small" />}
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
        <TblPagination />
      </Paper>
      <Popup
        title="Task Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TaskForm taskToEdit={taskToEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
