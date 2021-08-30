import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import actions from '../../actions';
import SerialConsole from '../Serial/Console';

const Connect = () => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(state => state.serialCommand.isDialogOpen);

  const handleClose = () => {
    dispatch(actions.serialCommand.closeDialog());
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleClose}
    >
      <DialogTitle>コマンド実行中……</DialogTitle>
      <SerialConsole />
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Connect;
