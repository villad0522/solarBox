import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Diagram from './pages/Diagram';
import Table from './pages/Table';
import ApiDocuments from './pages/ApiDocuments';
import ColabSample from './pages/ColabSample';

const useStyles = makeStyles((theme) => ({
  warapper: {
    display: 'flex',
    height: '100vh',
  },
}));

const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  return (
    <div className={classes.warapper}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{ borderRight: 1, borderColor: 'divider', width: '120px', }}
      >
        <Tab label="接続図" />
        <Tab label="データ集計" />
        <Tab label="API" />
        <Tab label="サンプル" />
      </Tabs>
      {
        (value === 0) ? <Diagram /> : null
      }
      {
        (value === 1) ? <Table /> : null
      }
      {
        (value === 2) ? <ApiDocuments /> : null
      }
      {
        (value === 3) ? <ColabSample /> : null
      }
    </div>
  );
}
export default App