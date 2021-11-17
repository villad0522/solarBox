import React from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { CopyBlock, a11yDark } from "react-code-blocks";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        overflowY: 'scroll',
        width: '100%',
    },
    table: {
        width: '90%',
        margin: '0 auto',
    },
    tableHead: {
        background: '#eee',
        position: 'sticky',
        top: 0,
    },
    copyBlock: {
        position: 'sticky',
        top: 0,
    },
}));


const sample = {
    year: 2022,
    month: 10,
    day: 14,
    week: "木",
    hour: 9,
    minutes: 27,
    seconds: 3,
    timestamp: 1634172966,
    name: "乗った瞬間快適サンシェード",
    type: "SigFox",
    location: {
        name: "福岡大学４号館１階",
        latitude: 33.55082284753141,
        longitude: 130.3666567275178,
        direction: "北東",
        tilt: 30,
    },
    solar: {
        voltage: 5,
        current: 20,
        power: 0.4,
    },
    battery: 70,
    temperature: 20,
    pressure: 10,
    humidity: 30,
    gas: 0,
    co2: 0,
    uv: 0,
};

const ApiDocuments = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Container>
                <Box padding={3} />
                <Typography variant="h4">
                    API ドキュメント
                </Typography>
                <Box padding={3} />
                <Typography variant="h5">
                    URL
                </Typography>
                <Box padding={1} />
                <CopyBlock
                    text="https://tec-log2.azurewebsites.net/api/getSolarAll?code=oNgnwUM00BM2KCAt2LDb/yccjS9GNs87MXFuk5aRrIPvSPRZpQ3ViQ=="
                    language='plane'
                    wrapLines
                    theme={a11yDark}
                />
                <Box padding={3} />
                <Typography variant="h5">
                    レスポンス
                </Typography>
                <Box padding={1} />
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <div className={classes.copyBlock}>
                            <CopyBlock
                                text={JSON.stringify(sample, null, 6)}
                                language='javascript'
                                wrapLines
                                theme={a11yDark}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell>フィールド名</TableCell>
                                    <TableCell>説明</TableCell>
                                    <TableCell>単位</TableCell>
                                    <TableCell>詳細</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>year</TableCell>
                                    <TableCell>年</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>month</TableCell>
                                    <TableCell>月</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>day</TableCell>
                                    <TableCell>日</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>week</TableCell>
                                    <TableCell>曜日</TableCell>
                                    <TableCell>日本語文字列</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>hour</TableCell>
                                    <TableCell>時</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>minutes</TableCell>
                                    <TableCell>分</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>seconds</TableCell>
                                    <TableCell>秒</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>timestamp</TableCell>
                                    <TableCell>タイムスタンプ</TableCell>
                                    <TableCell>[ms]</TableCell>
                                    <TableCell>1970年1月1日(UTC)からの経過秒数</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>name</TableCell>
                                    <TableCell>製品名</TableCell>
                                    <TableCell>右記の何れかの文字列</TableCell>
                                    <TableCell>
                                        "外でも涼しく過ごせるミスト"<br />
                                        "換気を促すCO2チェッカー"<br />
                                        "乗った瞬間快適サンシェード"
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>type</TableCell>
                                    <TableCell>通信方式</TableCell>
                                    <TableCell>右記の何れかの文字列</TableCell>
                                    <TableCell>
                                        "IM920"<br />
                                        "WiFi"<br />
                                        "SigFox"
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>location.name</TableCell>
                                    <TableCell>設置場所</TableCell>
                                    <TableCell>日本語文字列</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>location.latitude</TableCell>
                                    <TableCell>緯度</TableCell>
                                    <TableCell>[ °]</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>location.longitude</TableCell>
                                    <TableCell>経度</TableCell>
                                    <TableCell>[ °]</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>location.direction</TableCell>
                                    <TableCell>ソーラーパネルの方角</TableCell>
                                    <TableCell>日本語文字列</TableCell>
                                    <TableCell>８方位の何れか（例：北東）</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>location.tilt</TableCell>
                                    <TableCell>ソーラーパネルの傾斜角度</TableCell>
                                    <TableCell>[ °]</TableCell>
                                    <TableCell>
                                        水平に設置した場合は 0<br />
                                        垂直に設置した場合は 90
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>solar.voltage</TableCell>
                                    <TableCell>ソーラーパネルの電圧</TableCell>
                                    <TableCell>[V]</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>solar.current</TableCell>
                                    <TableCell>ソーラーパネルの電流</TableCell>
                                    <TableCell>[mA]</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>solar.power</TableCell>
                                    <TableCell>ソーラーパネルの電力</TableCell>
                                    <TableCell>[W]</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>battery</TableCell>
                                    <TableCell>バッテリー残量</TableCell>
                                    <TableCell>[%]</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>temperature</TableCell>
                                    <TableCell>気温</TableCell>
                                    <TableCell>[℃]</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>pressure</TableCell>
                                    <TableCell>気圧</TableCell>
                                    <TableCell>[hPa]</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>humidity</TableCell>
                                    <TableCell>湿度</TableCell>
                                    <TableCell>[%]</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>gas</TableCell>
                                    <TableCell>ガス抵抗</TableCell>
                                    <TableCell>[mΩ]</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>co2</TableCell>
                                    <TableCell>二酸化炭素濃度</TableCell>
                                    <TableCell>[ppm]</TableCell>
                                    <TableCell>"換気を促すCO2チェッカー"<br />のみ</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>uv</TableCell>
                                    <TableCell>紫外線量</TableCell>
                                    <TableCell>[mW/cm<sup>2</sup>]</TableCell>
                                    <TableCell>"換気を促すCO2チェッカー"<br />のみ</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Box padding={3} />
            </Container>
        </div>
    );
}
export default ApiDocuments