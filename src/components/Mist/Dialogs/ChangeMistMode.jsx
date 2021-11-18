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

const ChangeModeMode = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const ledMode = useSelector(state => state.im920.mist.ledMode);
  const mistMode = useSelector(state => state.im920.mist.mistMode);

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
        <DialogTitle>ミスト制御</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={mistMode}
            onChange={(event) =>
              dispatch(actions.im920.mist.setMistMode(event.target.value))
            }
          >
            <FormControlLabel control={<Radio />} value="0" label="常時OFF" />
            <FormControlLabel control={<Radio />} value="1" label="常時ON" />
            <FormControlLabel control={<Radio />} value="2" label="人がいるときだけON" />
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
export default ChangeModeMode;
