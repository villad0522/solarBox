import React from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux'

import SerialWiredDrawer from '../components/IM920/SettingDrawer';
import IM920ConnectButton from '../components/IM920/ConnectButton';
import IM920ConnectDialog from '../components/IM920/Connect';
import { Tree } from '../components/TreeDiagram';
import pcImg from '../img/pc.png'
import solarImg from '../img/solar.png'
import antennaImg from '../img/antenna.png'
import wifiImg from '../img/wifi.png'
//import ethernetImg from '../img/ethernet.png'
import sigfoxImg from '../img/sigfox.png'
import internetImg from '../img/internet.png'
//import groupImg from '../img/group.png'
//import accountImg from '../img/account.png'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    overflowX: 'scroll',
    overflowY: 'visible',
    boxSizing: 'border-box',
    height: '100vh',
    width: '100%',
    padding: '0 30px 0 30px',
  },
}));

const Diagram = () => {
  const classes = useStyles();
  const serialConnectFlag = useSelector(state => state.serial.connectFlag);
  const im920ConnectFlag = useSelector(state => state.im920.wired.connectFlag);
  const wiredConnectFlag = serialConnectFlag && im920ConnectFlag;
  let recieveIds = useSelector(state => state.im920.wired.recieveIds);
  const iotDatas = useSelector(state => state?.iotDatas);
  let sigfoxConnectFlag = false;
  const now = new Date();
  for (const data of iotDatas) {
    const time = now.getTime() - data?.timestamp;
    if (time > 180000) {
      //3分以上通信が来ない
      continue;
    }
    if (data?.type === "SigFox") {
      sigfoxConnectFlag = true;
    }
  }
  if (!Array.isArray(recieveIds)) {
    recieveIds = [];
  }
  return (
    <div className={classes.wrapper}>
      <IM920ConnectDialog />
      <Tree
        src={internetImg}
      >
        <Tree
          src={pcImg}
          name="パソコン"
          connectFlag={false}
          leftCableName="USB"
        >
          <Tree
            src={antennaImg}
            name="無線受信機"
            actionButtons={wiredConnectFlag ? <SerialWiredDrawer /> : null}
            connectFlag={wiredConnectFlag}
            connectButton={<IM920ConnectButton />}
          >
            {
              recieveIds.map(recieveId =>
                <Tree src={solarImg} name={recieveId} connectFlag={false} />
              )
            }
          </Tree>
        </Tree>
        <Tree
          src={sigfoxImg}
          name="Sigfox"
          connectFlag={true}
        >
          <Tree src={solarImg} name={"0072E4ED"} connectFlag={sigfoxConnectFlag} />
        </Tree>
        <Tree
          src={wifiImg}
          name="WiFiルーター"
          connectFlag={true}
        >
        </Tree>
        {/*
        <Tree
          src={ethernetImg}
          name="有線LAN"
          connectFlag={true}
        >
        </Tree>
        */}
      </Tree>
    </div>
  );
}
export default Diagram