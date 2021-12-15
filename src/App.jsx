import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Diagram from './pages/Diagram';
import Table from './pages/Table';
import ApiDocuments from './pages/ApiDocuments';
import ColabSample from './pages/ColabSample';
import MistSetting from './pages/MistSetting';
import CO2Documents from './pages/CO2Documents';

const App = () => {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ overflow: 'scroll', height: '100vh' }}>
      <AppBar position="fixed">
        <Tabs
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          textColor="inherit"
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <Tab label="データ集計" />
          <Tab label="接続図" />
          <Tab label="API" />
          <Tab label="サンプル" />
          <Tab label="ミスト操作" />
          <Tab label="CO2取説" />
        </Tabs>
      </AppBar>
      <Box sx={{ height: '48px' }} />
      {
        (value === 0) ? <Table /> : null
      }
      {
        (value === 1) ? <Diagram /> : null
      }
      {
        (value === 2) ? <ApiDocuments /> : null
      }
      {
        (value === 3) ? <ColabSample /> : null
      }
      {
        (value === 4) ? <MistSetting /> : null
      }
      {
        (value === 5) ? <CO2Documents /> : null
      }
    </Box>
  );
}
export default App