import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Diagram from './components/Diagram';
import Table from './components/Table';

const useStyles = makeStyles((theme) => ({
  warapper: {
    display: 'flex',
    height: '100vh',
  },
  appBar: {
    width: 'min-content',
    height: '100vh',
    top: '0',
    bottom: '0',
    right: 'auto',
    left: '0',
  },
}));

const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  return (
    <div className={classes.warapper}>
      <AppBar position="relative" className={classes.appBar}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <Tab label="接続" />
          <Tab label="データ集計" />
        </Tabs>
      </AppBar>
      {
        (value === 0) ? <Diagram /> : null
      }
      {
        (value === 1) ? <Table /> : null
      }
    </div>
  );
}
export default App