import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';

import DownloadButton from '../components/DownloadButton';

export default function BasicTable() {
    const iotDatas = useSelector(state => state?.iotDatas);
    return (
        <>
            <Table sx={{ overflow: 'visible', minWidth: 'max-content', position: 'relative', }}>
                <TableHead sx={{ background: '#eee', position: 'sticky', top: '48px', zIndex: '10', }}>
                    <TableRow>
                        <TableCell align="right">日時</TableCell>
                        <TableCell align="right">製品名</TableCell>
                        <TableCell align="right">通信方式</TableCell>
                        <TableCell align="right">ソーラー電圧 [V]</TableCell>
                        <TableCell align="right">ソーラー電流 [mA]</TableCell>
                        <TableCell align="right">ソーラー電力 [mW]</TableCell>
                        <TableCell align="right">バッテリー残量 [%]</TableCell>
                        <TableCell align="right">気温 [℃]</TableCell>
                        <TableCell align="right">気圧 [hPa]</TableCell>
                        <TableCell align="right">湿度 [%]</TableCell>
                        <TableCell align="right">ガス抵抗 [mΩ]</TableCell>
                        <TableCell align="right">CO2</TableCell>
                        <TableCell align="right">紫外線</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (iotDatas.length > 0) ?
                            iotDatas.slice(0,).map((data) => <MyRow key={data.id} data={data} />)
                            :
                            [
                                <MyLoadingRow key="load0" />,
                                <MyLoadingRow key="load1" />,
                                <MyLoadingRow key="load2" />,
                                <MyLoadingRow key="load3" />,
                                <MyLoadingRow key="load4" />,
                                <MyLoadingRow key="load5" />,
                                <MyLoadingRow key="load6" />,
                                <MyLoadingRow key="load7" />,
                                <MyLoadingRow key="load8" />,
                                <MyLoadingRow key="load9" />,
                                <MyLoadingRow key="load10" />,
                                <MyLoadingRow key="load11" />,
                                <MyLoadingRow key="load12" />,
                                <MyLoadingRow key="load13" />,
                                <MyLoadingRow key="load14" />,
                                <MyLoadingRow key="load15" />,
                                <MyLoadingRow key="load16" />,
                                <MyLoadingRow key="load17" />,
                                <MyLoadingRow key="load18" />,
                                <MyLoadingRow key="load19" />,
                            ]
                    }
                </TableBody>
            </Table>
            <DownloadButton />
        </>
    );
}


const MyLoadingRow = ({ key }) => {
    return (
        <TableRow key={key}>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
            <TableCell>< Skeleton animation="wave" /></TableCell>
        </TableRow>
    );

}

const MyRow = ({ data }) => {
    let dateString = data?.year;
    dateString += '/';
    dateString += ('00' + data?.month).slice(-2);
    dateString += '/';
    dateString += ('00' + data?.day).slice(-2);
    dateString += '(';
    dateString += data?.week;
    dateString += ') ';
    dateString += ('00' + data?.hour).slice(-2);
    dateString += ':';
    dateString += ('00' + data?.minutes).slice(-2);
    dateString += ':';
    dateString += ('00' + data?.seconds).slice(-2);
    return (
        <TableRow key={data.id}>
            <TableCell align="right">{dateString}</TableCell>
            <TableCell align="right">{data?.name}</TableCell>
            <TableCell align="right">{data?.type}</TableCell>
            <TableCell align="right">{data?.solar?.voltage?.toFixed(1)}</TableCell>
            <TableCell align="right">{data?.solar?.current?.toFixed(1)}</TableCell>
            <TableCell align="right">{data?.solar?.power?.toFixed(1)}</TableCell>
            <TableCell align="right">{data?.battery + '%'}</TableCell>
            <TableCell align="right">{data?.temperature}</TableCell>
            <TableCell align="right">{data?.pressure}</TableCell>
            <TableCell align="right">{data?.humidity + '%'}</TableCell>
            <TableCell align="right">{data?.gas}</TableCell>
            <TableCell align="right">{data?.co2}</TableCell>
            <TableCell align="right">{data?.uv}</TableCell>
        </TableRow>
    );

}