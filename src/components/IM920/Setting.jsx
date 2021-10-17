import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

import actions from '../../actions';
import DeleteRecieveIds from './Dialogs/DeleteRecieveIds';
import AddRecieveId from './Dialogs/AddRecieveId';
import ChangeNodeNumber from './Dialogs/ChangeNodeNumber';
import ChangeChannel from './Dialogs/ChangeChannel';
import ChangePower from './Dialogs/ChangePower';
import ChangeRate from './Dialogs/ChangeRate';
import ChangeSleepTime from './Dialogs/ChangeSleepTime';
import ChangeWorkTime from './Dialogs/ChangeWorkTime';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxWidth: '500px',
    maxHeight: '100%',
    overflowY: 'scroll',
  },
  table: {
    maxWidth: '600px',
    margin: '0 auto 50px auto',
  },
  tableCell: {
    minWidth: '0',
    maxWidth: '300px',
    wordBreak: 'break-all',
    textAlign: 'left',
  },
  th: {
    textAlign: 'right',
  },
}));

const SerialWiredInfomation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deviceId = useSelector(state => state.im920.wired.deviceId);
  const nodeNumber = useSelector(state => state.im920.wired.nodeNumber);
  const recieveIds = useSelector(state => state.im920.wired.recieveIds);
  const channelNumber = useSelector(state => state.im920.wired.channelNumber);
  const RSSI = useSelector(state => state.im920.wired.RSSI);
  const sendPower = useSelector(state => state.im920.wired.sendPower);
  const wirelessRate = useSelector(state => state.im920.wired.wirelessRate);
  const version = useSelector(state => state.im920.wired.version);
  const sleepTime = useSelector(state => state.im920.wired.sleepTime);
  const workTime = useSelector(state => state.im920.wired.workTime);
  return (
    <div className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell component="th" align="right">ID：</TableCell>
            <TableCell colSpan={2}><div className={classes.tableCell}>{deviceId}</div></TableCell >
          </TableRow>
          <TableRow>
            <TableCell rowSpan={2} component="th" align="right">受信対象のID：</TableCell>
            <TableCell rowSpan={2}><div className={classes.tableCell}>{recieveIdsConverter(recieveIds)}</div></TableCell >
            <TableCell align="right">
              <AddRecieveId />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell align="right">
              <DeleteRecieveIds />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">ノード番号：</TableCell>
            <TableCell><div className={classes.tableCell}>{nodeNumber}</div></TableCell >
            <TableCell align="right">
              <ChangeNodeNumber />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">無線チャンネル：</TableCell>
            <TableCell><div className={classes.tableCell}>{channelConverter(channelNumber)}</div></TableCell >
            <TableCell align="right">
              <ChangeChannel />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">RSSI値(電波強度)：</TableCell>
            <TableCell><div className={classes.tableCell}>{parseInt(RSSI, 16)}</div></TableCell >
            <TableCell align="right">
              <Button
                variant="contained"
                size="small"
                onClick={() => dispatch(actions.im920.wired.executeCommands("RSSI", ["RDRS\r"]))}
              >
                再計測
              </Button>
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">送信出力：</TableCell>
            <TableCell><div className={classes.tableCell}>{sendPowerConverter(sendPower)}</div></TableCell >
            <TableCell align="right">
              <ChangePower />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">無線通信速度：</TableCell>
            <TableCell><div className={classes.tableCell}>{wirelessRateConverter(wirelessRate)}</div></TableCell >
            <TableCell align="right">
              <ChangeRate />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">スリープ時間：</TableCell>
            <TableCell><div className={classes.tableCell}>{sleepTimeConverter(sleepTime)}</div></TableCell >
            <TableCell align="right">
              <ChangeSleepTime />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">間欠動作時間：</TableCell>
            <TableCell><div className={classes.tableCell}>{workTimeConverter(workTime)}</div></TableCell >
            <TableCell align="right">
              <ChangeWorkTime />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">製品バージョン：</TableCell>
            <TableCell><div className={classes.tableCell}>{version}</div></TableCell >
            <TableCell align="right"></TableCell >
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
export default SerialWiredInfomation;

const recieveIdsConverter = (array) => {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.map((recieveId, index) =>
    <span key={index} style={{ display: 'inline-block' }}>
      {recieveId ? recieveId : null},
    </span>
  );
}

const workTimeConverter = (string) => {
  const workTime = parseInt(string, 16) * 0.01001;
  return workTime.toFixed(3) + "秒";
}

const sleepTimeConverter = (string) => {
  const sleepTime = parseInt(string, 16);
  if (sleepTime === 0) {
    return "連続";
  }
  else {
    return sleepTime + "秒";
  }
}

const wirelessRateConverter = (wirelessRate) => {
  if (wirelessRate === "1") {
    return "高速モード";
  }
  else if (wirelessRate === "2") {
    return "長距離モード";
  }
  else {
    return "エラー";
  }
}

const sendPowerConverter = (sendPower) => {
  if (sendPower === "1") {
    return "-10dBm (0.1mW)";
  }
  else if (sendPower === "2") {
    return "0dBm (1mW)";
  }
  else if (sendPower === "3") {
    return "10dBm (10mW)";
  }
  else {
    return "エラー";
  }
}

const channelConverter = (channelNumber) => {
  if (channelNumber === "01") {
    return "01 (920.6MHz)";
  }
  else if (channelNumber === "02") {
    return "02 (920.8MHz)";
  }
  else if (channelNumber === "03") {
    return "03 (921.0MHz)";
  }
  else if (channelNumber === "04") {
    return "04 (921.2MHz)";
  }
  else if (channelNumber === "05") {
    return "05 (921.4MHz)";
  }
  else if (channelNumber === "06") {
    return "06 (921.6MHz) 非推奨";
  }
  else if (channelNumber === "07") {
    return "07 (921.8MHz)";
  }
  else if (channelNumber === "08") {
    return "08 (922.0MHz)";
  }
  else if (channelNumber === "09") {
    return "09 (922.2MHz)";
  }
  else if (channelNumber === "10") {
    return "10 (922.4MHz)";
  }
  else if (channelNumber === "11") {
    return "11 (922.6MHz)";
  }
  else if (channelNumber === "12") {
    return "12 (922.8MHz)";
  }
  else if (channelNumber === "13") {
    return "13 (923.0MHz)";
  }
  else if (channelNumber === "14") {
    return "14 (923.2MHz)";
  }
  else if (channelNumber === "15") {
    return "15 (923.4MHz)";
  }
  else {
    return "エラー";
  }
}