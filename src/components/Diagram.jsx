import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'

import SerialWiredDrawer from './IM920/SettingDrawer';
import IM920ConnectButton from './IM920/ConnectButton';
import IM920ConnectDialog from './IM920/Connect';
import { Tree } from './TreeDiagram';
import pcImg from '../img/pc.png'
import solarImg from '../img/solar.png'
import antennaImg from '../img/antenna.png'
import wifiImg from '../img/wifi.png'
import ethernetImg from '../img/ethernet.png'
import sigfoxImg from '../img/sigfox.png'
import internetImg from '../img/internet.png'
import groupImg from '../img/group.png'
import accountImg from '../img/account.png'

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
          src={groupImg}
          name="福岡大学"
          connectFlag={true}
        >
          <Tree
            src={accountImg}
            name="木村"
            connectFlag={true}
          >
            <Tree
              src={pcImg}
              name="このパソコン"
              connectFlag={false}
              leftCableName="USB"
            >
              <Tree
                src={antennaImg}
                name="無線"
                actionButtons={wiredConnectFlag ? <SerialWiredDrawer /> : null}
                connectFlag={wiredConnectFlag}
                connectButton={<IM920ConnectButton />}
              >
                {
                  recieveIds.map(recieveId =>
                    <Tree src={solarImg} name={"0x" + recieveId} connectFlag={false} />
                  )
                }
              </Tree>
            </Tree>
            <Tree
              src={sigfoxImg}
              name="02783"
              connectFlag={true}
              leftCableName="Sigfox無線"
            >
            </Tree>
            <Tree
              src={ethernetImg}
              name="有線LAN"
              connectFlag={true}
            >
            </Tree>
            <Tree
              src={wifiImg}
              name="WiFiルーター"
              connectFlag={true}
            >
            </Tree>
          </Tree>
          <Tree
            src={accountImg}
            name="木村"
            connectFlag={true}
          >
          </Tree>
        </Tree>
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
        <Tree
          src={groupImg}
          name="A大学"
        />
      </Tree>
    </div>
  );
}
export default Diagram