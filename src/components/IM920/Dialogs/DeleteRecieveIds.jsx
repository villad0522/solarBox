import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import actions from '../../../actions';

const DeleteRecieveIds = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    dispatch(actions.im920.wired.executeCommands(
      "recieveIds",
      ["ENWR\r", "ERID\r", "DSWR\r", "RRID\r"],
    ));
  };

  return (
    <div>
      <Button variant="contained" size="small" color="primary" onClick={handleClickOpen}>
        全消去
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>本当に削除しますか？</DialogTitle>
        <DialogContent>
          <DialogContentText>
            無線モジュールに登録された全ての受信IDが削除されます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            キャンセル
          </Button>
          <Button onClick={handleAgree} variant="contained" color="primary" autoFocus>
            全て削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeleteRecieveIds;
