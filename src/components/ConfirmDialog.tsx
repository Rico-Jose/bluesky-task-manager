import React from 'react';
import Controls from './controls/Controls';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@material-ui/core';

export default function ConfirmDialog(props: any) {
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Controls.Button text="No" color="default" />
        <Controls.Button text="Yes" color="secondary" />
      </DialogActions>
    </Dialog>
  );
}
