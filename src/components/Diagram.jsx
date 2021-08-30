import React from 'react';
import { useSelector } from 'react-redux'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import SerialWiredDrawer from './IM920/SettingDrawer';
import IM920ConnectButton from './IM920/ConnectButton';
import IM920ConnectDialog from './IM920/Connect';
import { Tree, Node } from './TreeDiagram';
import pcImg from '../img/pc.png'
import solarImg from '../img/solar.png'
import antennaImg from '../img/antenna.png'
import wifiImg from '../img/wifi.png'
import ethernetImg from '../img/ethernet.png'
import sigfoxImg from '../img/sigfox.png'

const Diagram = () => {
  const serialConnectFlag = useSelector(state => state.serial.connectFlag);
  const im920ConnectFlag = useSelector(state => state.im920.wired.connectFlag);
  const wiredConnectFlag = serialConnectFlag && im920ConnectFlag;
  let recieveIds = useSelector(state => state.im920.wired.recieveIds);
  if (!Array.isArray(recieveIds)) {
    recieveIds = [];
  }
  return (
    <>
      <IM920ConnectDialog />
      <Box p={4} />
      <Container>
        <Tree src={pcImg}>
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
          <Tree
            src={sigfoxImg}
            name="Sigfox"
            connectFlag={true}
          >
          </Tree>
          <Tree
            src={antennaImg}
            name="無線モジュール"
            settingButton={wiredConnectFlag ? <SerialWiredDrawer /> : null}
            connectFlag={wiredConnectFlag}
            connectButton={<IM920ConnectButton />}
          >
            {
              recieveIds.map(recieveId =>
                <Node src={solarImg} name={"0x" + recieveId} connectFlag={false} />
              )
            }
          </Tree>
        </Tree>
      </Container >
    </>
  );
}
export default Diagram