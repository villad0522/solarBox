import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import actions from '../../../actions';

const ChangePower = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const initValue = useSelector(state => state.im920.wired.sendPower);
  const [sendPower, setSendPower] = useState(initValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    dispatch(actions.im920.wired.executeCommands(
      "sendPower",
      ["ENWR\r", "STPO " + sendPower + "\r", "DSWR\r", "RDPO\r"],
    ));
  };

  return (
    <div>
      <Button variant="contained" size="small" color="primary" onClick={handleClickOpen}>
        変更
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>送信出力変更</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={sendPower}
            onChange={(event) => setSendPower(event.target.value)}
          >
            <FormControlLabel control={<Radio />} value="1" label="-10dBm (0.1mW)" />
            <FormControlLabel control={<Radio />} value="2" label="0dBm (1mW)" />
            <FormControlLabel control={<Radio />} value="3" label="10dBm (10mW)" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            キャンセル
          </Button>
          <Button
            onClick={handleAgree}
            variant="contained"
            color="primary"
          >
            変更
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ChangePower;
