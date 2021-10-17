import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import actions from '../../actions';

const useStyles = makeStyles((theme) => ({
  connectButton: {
    backgroundColor: '#0c0',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0d0',
    },
  },
}));

const ConnectButton = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const serialConnectFlag = useSelector(state => state.serial.connectFlag);
  const im920ConnectFlag = useSelector(state => state.im920.wired.connectFlag);
  if (serialConnectFlag && im920ConnectFlag) {
    return (
      <Button
        variant="contained"
        size="small"
        onClick={() => dispatch(actions.im920.wired.disconnect())}
      >
        切断
      </Button>
    );
  }
  else {
    return (
      <Button
        variant="contained"
        size="small"
        className={classes.connectButton}
        onClick={() => dispatch(actions.im920.wired.connect())}
      >
        接続
      </Button>
    );
  }
}
export default ConnectButton