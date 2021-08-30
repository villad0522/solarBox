import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import SerialWiredDrawer from './components/IM920/SettingDrawer';

import actions from './actions';
import IM920ConnectDialog from './components/IM920/Connect';
import pcImg from './img/pc.png'
import solarImg from './img/solar.png'
import antennaImg from './img/antenna.png'

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
  },
  table: {
    background: '#eeeeee',
    width: '100%',
    tableLayout: 'fixed',
    borderCollapse: 'collapse',		//セル同士の間に隙間を空けない
  },
  tr1: {
    height: '20px',
  },
  tr2: {
    height: '10vw',
  },
  buttonWrapper: {
    textAlign: 'center',
    paddingBottom: '20px',
    verticalAlign: 'bottom',
  },
  cableSolid: {
    borderTop: '6px solid #bbb',
    color: '#bbb',
    textAlign: 'center',
    paddingTop: '20px',
    verticalAlign: 'top',
  },
  cableDotted: {
    borderTop: '6px dotted #bbb',
    color: '#bbb',
    textAlign: 'center',
    paddingTop: '20px',
    verticalAlign: 'top',
  },
  connectButton: {
    backgroundColor: '#0c0',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0d0',
    },
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const serialConnectFlag = useSelector(state => state.serial.connectFlag);
  const wiredConnectFlag2 = useSelector(state => state.im920.wired.connectFlag);
  const wiredConnectFlag = serialConnectFlag && wiredConnectFlag2;
  const remoteConnectFlag = false;//wiredConnectFlag && useSelector(state => state.im920.connectFlag);
  return (
    <Container>
      <IM920ConnectDialog />
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={12}>
      </Grid>
      <table className={classes.table}>
        <tbody>
          <tr className={classes.tr1}>
            <td colSpan={2}></td>
            <td colSpan={2} rowSpan={2} className={classes.buttonWrapper}>
              {
                wiredConnectFlag ?
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(actions.im920.wired.disconnect())}
                  >
                    切断
                  </Button> :
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.connectButton}
                    onClick={() => dispatch(actions.im920.wired.connect())}
                  >
                    接続
                  </Button>
              }
            </td>
            <td colSpan={2}></td>
            <td colSpan={2} rowSpan={2} className={classes.buttonWrapper}>
              {
                remoteConnectFlag ?
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(actions.im920.disconnect())}
                  >
                    切断
                  </Button> :
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.connectButton}
                    disabled={!wiredConnectFlag}
                    onClick={() => dispatch(actions.im920.connect())}
                  >
                    接続
                  </Button>
              }
            </td>
            <td colSpan={2}></td>
          </tr>
          <tr className={classes.tr2}>
            <td colSpan={2} rowSpan={2}>
              <img src={pcImg} className={classes.img} alt="" />
            </td>
            <td colSpan={2} rowSpan={2}>
              <img src={antennaImg} className={classes.img} alt="" />
            </td>
            <td colSpan={2} rowSpan={2}>
              <img src={solarImg} className={classes.img} alt="" />
            </td>
          </tr>
          <tr className={classes.tr2}>
            <td
              colSpan={2}
              className={classes.cableSolid}
              style={wiredConnectFlag ? { borderColor: '#0c0', color: '#0c0', } : null}
            >
              {wiredConnectFlag ? <CheckIcon /> : <CloseIcon />}
            </td>
            <td
              colSpan={2}
              className={classes.cableDotted}
              style={remoteConnectFlag ? { borderColor: '#0c0', color: '#0c0', } : null}
            >
              {remoteConnectFlag ? <CheckIcon /> : <CloseIcon />}
            </td>
          </tr>
        </tbody>
      </table>
      {wiredConnectFlag ? <SerialWiredDrawer /> : null}
    </Container >
  );
}
export default App