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

const ChangeMusicMode = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const musicMode = useSelector(state => state.im920.mist.musicMode);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <DialogTitle>スピーカー制御</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={musicMode}
            onChange={(event) =>
              dispatch(actions.im920.mist.setMusicMode(event.target.value))
            }
          >
            <FormControlLabel control={<Radio />} value="0" label="常時OFF" />
            <FormControlLabel control={<Radio />} value="1" label="常時「ゆりかごの唄」" />
            <FormControlLabel control={<Radio />} value="2" label="常時「ブラームスの子守唄」" />
            <FormControlLabel control={<Radio />} value="3" label="常時「ロッカバイ ベィビィ」" />
            <FormControlLabel control={<Radio />} value="4" label="人が来たら「ゆりかごの唄」" />
            <FormControlLabel control={<Radio />} value="5" label="人が来たら「ブラームスの子守唄」" />
            <FormControlLabel control={<Radio />} value="6" label="人が来たら「ロッカバイ ベィビィ」" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ChangeMusicMode;
