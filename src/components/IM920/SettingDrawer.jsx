import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';

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