// TaskDialog.js
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Dialogs = ({ open, handleClose, handleConfirmed, title, description, buttonText }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
  <DialogTitle id="dialog-title">{title}</DialogTitle>
  <DialogContent>
    <DialogContentText id="dialog-description">
      {description}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      {buttonText || 'No'}
    </Button>
    {title === 'Confirm Delete' || title === 'Mark as Completed' ? (
      <Button onClick={handleConfirmed} color="primary" autoFocus>
        {buttonText || 'Yes'}
      </Button>
    ) : null}
  </DialogActions>
</Dialog>

  );
}

export default Dialogs;
