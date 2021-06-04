import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

export default function Popup(props: any) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <div>title</div>
      </DialogTitle>
      <DialogContent>
        <div>DialogContent</div>
      </DialogContent>
    </Dialog>
  );
}
