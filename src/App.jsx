import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import TimeSchedule from './containers/TimeSchedule';
import FlashDialog from './containers/FlashDialog';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
  },
  buttonWrapper: {
    position: 'sticky',
    bottom: 0,
    background: '#fff',
    zIndex: 3,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <TimeSchedule />
      <Box p={2} />
      {/* <FlashDialog testMode="combo">
        combo test
      </FlashDialog>
      <FlashDialog testMode="rotate">
        rotate test
      </FlashDialog>
      <FlashDialog testMode="lastDelete">
        last delete test
      </FlashDialog>
      <FlashDialog testMode="escape">
        escape test
      </FlashDialog>
      <FlashDialog testMode="JoinHalfByte">
        join half byte test
      </FlashDialog>
      <FlashDialog testMode="singleCheckSum">
        single checksum test
      </FlashDialog>
      <FlashDialog testMode="randomCheckSum">
        random checksum test
      </FlashDialog>
      <Box p={2} /> */}
      <Box p={2} className={classes.buttonWrapper}>
        <FlashDialog>
          書き込み
        </FlashDialog>
      </Box>
    </Container >
  );
}
export default App