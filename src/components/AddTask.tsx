import React, { useState } from 'react';
import UsersDropdown from './UsersDropdown';
import { useAddTask } from '../contexts/TaskContext';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  TextField,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AddTask(props: any) {
  let open = props.openAddTask;
  const addTask = useAddTask();
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const getUserId = (id: any) => {
    setUser(id);
  };

  const handleClick = () => {
    if (name) {
      const task = {
        name: name,
        user: user,
        isComplete: isComplete,
      };

      addTask(task);

      //  Reset values
      setName('');
      setIsComplete(false);

      props.onClose(true);
    }
  };

  return (
    <Dialog
      onClose={() => props.onClose(true)}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => props.onClose(true)}
      >
        Add Task
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          placeholder="Enter name"
          fullWidth
        />
        <UsersDropdown getUserId={getUserId} />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.currentTarget.checked)}
            />
          }
          label="Completed"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => props.onClose(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          autoFocus
          onClick={handleClick}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
