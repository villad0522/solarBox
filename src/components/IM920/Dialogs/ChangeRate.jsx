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
import DialogContentText from '@mui/material/DialogContentText';

import actions from '../../../actions';

const ChangeRate = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const initValue = useSelector(state => state.im920.wired.wirelessRate);
  const [wirelessRate, setWirelessRate] = useState(initValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    dispatch(actions.im920.wired.executeCommands(
      "wirelessRate",
      ["ENWR\r", "STRT " + wirelessRate + "\r", "DSWR\r", "RDRT\r"],
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
        <DialogTitle>無線通信速度変更</DialogTitle>
        <DialogContent>
          <DialogContentText>
            対向する無線モジュールと同じ速度を設定してください。
          </DialogContentText>
          <RadioGroup
            value={wirelessRate}
            onChange={(event) => setWirelessRate(event.target.value)}
          >
            <FormControlLabel control={<Radio />} value="1" label="高速通信モード（無線通信速度 50kbps）" />
            <FormControlLabel control={<Radio />} value="2" label="長距離モード（無線通信速度 1.25kbps）" />
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
export default ChangeRate;
