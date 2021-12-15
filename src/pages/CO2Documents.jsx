import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import imgOFF from '../img/off.jpg'
import imgSleep from '../img/sleep.jpg'
import imgWifi from '../img/wifi.jpg'
import imgSmartConfig from '../img/smartconfig.jpg'
import imgHeating from '../img/heating.jpg'
import imgData from '../img/data.jpg'

const CO2Documents = () => {
    return (
        <Box sx={{ background: '#fafafa', minHeight: '100vh', }}>
            <Container>
                <Box padding={3} />
                <Typography variant="h5">
                    換気を促すCO2チェッカー
                </Typography>
                <Box padding={2} />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia component="img" image={imgOFF} alt="" />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    電源OFF
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    電源スイッチが左に倒れた状態です。
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia component="img" image={imgSleep} alt="" />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    スリープ中
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    電源スイッチが右に倒れた状態です。
                                    <br />
                                    １時間に１度自動的に復帰・計測しますので、何も操作する必要はありません。
                                    <br />
                                    強制的に復帰させたいときは、タッチスイッチに触れてください。
                                    <br /><br />
                                    夜18時～翌朝6時の間は自動復帰しません。また、バッテリー残量が30%以下のときも自動復帰しません。
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia component="img" image={imgWifi} alt="" />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    WiFi 接続中
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    最後に設定したWiFiスポットへ接続を試みている状態です。
                                    <br />
                                    このまま何も操作をせずに、しばらくお待ちください。
                                    30秒間接続できなかった場合はスリープモードへ移行します。
                                    <br />
                                    <br />
                                    前回と異なるWiFiスポットへ接続したいときは、タッチスイッチを長押ししてください。
                                    <br />
                                    初期設定では「HUMAX-542FF」に接続します。
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia component="img" image={imgSmartConfig} alt="" />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    WiFiスポット 変更待ち
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    WiFiの設定変更を待っている状態です。
                                    <br />
                                    WiFiスポットを変更する場合は、スマートフォンアプリ「IoT Smartconfig」を使って登録してください。
                                    <br /><br />
                                    WiFiスポットを変更するつもりがない場合は、電源スイッチを入れ直してください。
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia component="img" image={imgData} alt="" />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    計測結果表示中
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Box padding={3} />
            </Container>
        </Box>
    );
}
export default CO2Documents