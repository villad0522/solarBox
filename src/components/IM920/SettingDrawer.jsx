import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';

import Setting from './Setting';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  closeButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const SettingDrawer = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    "serial-0": false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  return (
    <div>
      <IconButton
        onClick={toggleDrawer("serial-0", true)}
        size="small"
      >
        <SettingsIcon />
      </IconButton >
      <Drawer anchor="right" open={state["serial-0"]} onClose={toggleDrawer("serial-0", false)}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.closeButton} color="inherit" onClick={toggleDrawer("serial-0", false)}>
              <ChevronRightIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              無線モジュールの設定
            </Typography>
          </Toolbar>
        </AppBar>
        <Setting />
      </Drawer>
    </div>
  );
}
export default SettingDrawer;