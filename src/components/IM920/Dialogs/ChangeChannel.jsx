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

const ChangeChannel = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const initValue = useSelector(state => state.im920.wired.channelNumber);
  const [channelNumber, setChannelNumber] = useState(initValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    dispatch(actions.im920.wired.executeCommands(
      "channelNumber",
      ["STCH " + channelNumber + "\r", "RDCH\r"],
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
        <DialogTitle>無線チャンネル変更</DialogTitle>
        <DialogContent>
          <DialogContentText>
            対向する無線モジュールと同じ通信チャンネルを設定してください。<br />
            チャンネル番号 06 は内部信号の影響があり、安定して通信できないため使用をお薦めしません。
          </DialogContentText>
          <RadioGroup
            value={channelNumber}
            onChange={(event) => setChannelNumber(event.target.value)}
          >
            <FormControlLabel control={<Radio />} value="01" label="01 (920.6MHz)" />
            <FormControlLabel control={<Radio />} value="02" label="02 (920.8MHz)" />
            <FormControlLabel control={<Radio />} value="03" label="03 (921.0MHz)" />
            <FormControlLabel control={<Radio />} value="04" label="04 (921.2MHz)" />
            <FormControlLabel control={<Radio />} value="05" label="05 (921.4MHz)" />
            <FormControlLabel control={<Radio />} value="06" label="06 (921.6MHz) 非推奨" />
            <FormControlLabel control={<Radio />} value="07" label="07 (921.8MHz)" />
            <FormControlLabel control={<Radio />} value="08" label="08 (922.0MHz)" />
            <FormControlLabel control={<Radio />} value="09" label="09 (922.2MHz)" />
            <FormControlLabel control={<Radio />} value="10" label="10 (922.4MHz)" />
            <FormControlLabel control={<Radio />} value="11" label="11 (922.6MHz)" />
            <FormControlLabel control={<Radio />} value="12" label="12 (922.8MHz)" />
            <FormControlLabel control={<Radio />} value="13" label="13 (923.0MHz)" />
            <FormControlLabel control={<Radio />} value="14" label="14 (923.2MHz)" />
            <FormControlLabel control={<Radio />} value="15" label="15 (923.4MHz)" />
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
export default ChangeChannel;
