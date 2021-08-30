import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Diagram from './components/Diagram';
import Table from './components/Table';


const App = () => {
  const [value, setValue] = useState(0);
  return (
    <>
      <AppBar position="static">
        <Tabs
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
    </>
  );
}
export default App