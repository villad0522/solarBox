import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import ChangeLedMode from './Dialogs/ChangeLedMode';
import ChangeMistMode from './Dialogs/ChangeMistMode';

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
  return (
    <div className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell component="th" align="right">ミスト：</TableCell>
            <TableCell>
              <div className={classes.tableCell}>{mistMode}</div>
            </TableCell >
            <TableCell align="right">
              <ChangeMistMode />
            </TableCell >
          </TableRow>
          <TableRow>
            <TableCell component="th" align="right">LED：</TableCell>
            <TableCell>
              <div className={classes.tableCell}>{ledMode}</div>
            </TableCell >
            <TableCell align="right">
              <ChangeLedMode />
            </TableCell >
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
export default MistInfomation;
