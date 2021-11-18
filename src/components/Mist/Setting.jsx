import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import ChangeLedMode from './Dialogs/ChangeLedMode';
import ChangeMistMode from './Dialogs/ChangeMistMode';
import ChangeMusicMode from './Dialogs/ChangeMusicMode';

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

const MistInfomation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mistMode = useSelector(state => state.im920.mist.mistMode);
  const ledMode = useSelector(state => state.im920.mist.ledMode);
  const musicMode = useSelector(state => state.im920.mist.musicMode);
  return (
    <div className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell component="th" align="right">ミスト：</TableCell>
            <TableCell>
              <div className={classes.tableCell}>{mistModeConverter(mistMode)}</div>
            </TableCell >
            <TableCell align="right">
              <ChangeMistMode />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">LED：</TableCell>
            <TableCell>
              <div className={classes.tableCell}>{ledModeConverter(ledMode)}</div>
            </TableCell >
            <TableCell align="right">
              <ChangeLedMode />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">音楽：</TableCell>
            <TableCell>
              <div className={classes.tableCell}>{musicModeConverter(musicMode)}</div>
            </TableCell >
            <TableCell align="right">
              <ChangeMusicMode />
            </TableCell >
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
export default MistInfomation;

const mistModeConverter = (mistMode) => {
  if (mistMode === "0") {
    return "常にOFF";
  }
  else if (mistMode === "1") {
    return "常にON";
  }
  else if (mistMode === "2") {
    return "人がいるときだけON";
  }
  else {
    return "エラー";
  }
}

const ledModeConverter = (ledMode) => {
  if (ledMode === "0") {
    return "常にOFF";
  }
  else if (ledMode === "1") {
    return "常にON";
  }
  else if (ledMode === "2") {
    return "人がいるときだけON";
  }
  else {
    return "エラー";
  }
}

const musicModeConverter = (musicMode) => {
  if (musicMode === "0") {
    return "常にOFF";
  }
  else if (musicMode === "1") {
    return "常に「ゆりかごの唄」";
  }
  else if (musicMode === "2") {
    return "常に「ブラームスの子守唄」";
  }
  else if (musicMode === "3") {
    return "常に「ロッカバイ ベィビィ」";
  }
  else if (musicMode === "4") {
    return "人が来たら「ゆりかごの唄」";
  }
  else if (musicMode === "5") {
    return "人が来たら「ブラームスの子守唄」";
  }
  else if (musicMode === "6") {
    return "人が来たら「ロッカバイ ベィビィ」";
  }
  else {
    return "エラー";
  }
}