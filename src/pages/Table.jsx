import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    tableContainer: {
        overflowX: 'scroll',
    },
    table: {
        width: 'max-content',
    },
});

export default function BasicTable() {
    const classes = useStyles();
    const datas = useSelector(state => state?.datas);
    const dispatch = useDispatch();
    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">日時</TableCell>
                        <TableCell align="right">製品名</TableCell>
                        <TableCell align="right">通信方式</TableCell>
                        <TableCell align="right">設置場所名</TableCell>
                        <TableCell align="right">緯度</TableCell>
                        <TableCell align="right">経度</TableCell>
                        <TableCell align="right">方角</TableCell>
                        <TableCell align="right">傾斜角度</TableCell>
                        <TableCell align="right">ソーラー電圧 [V]</TableCell>
                        <TableCell align="right">ソーラー電流 [A]</TableCell>
                        <TableCell align="right">ソーラー電力 [W]</TableCell>
                        <TableCell align="right">バッテリー電圧 [V]</TableCell>
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
                        datas.map((data) => <MyRow key={data.id} data={data} />)
                    }
                </TableBody>
            </Table>
        </TableContainer>
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
            <TableCell align="right">{data?.location?.name}</TableCell>
            <TableCell align="right">{data?.location?.latitude?.toFixed(3)}</TableCell>
            <TableCell align="right">{data?.location?.longitude?.toFixed(3)}</TableCell>
            <TableCell align="right">{data?.location?.direction}</TableCell>
            <TableCell align="right">{data?.location?.tilt}</TableCell>
            <TableCell align="right">{data?.solar?.voltage?.toFixed(1)}</TableCell>
            <TableCell align="right">{data?.solar?.current?.toFixed(1)}</TableCell>
            <TableCell align="right">{data?.solar?.power?.toFixed(1)}</TableCell>
            <TableCell align="right">{data?.battery?.voltage?.toFixed(1)}</TableCell>
            <TableCell align="right">{data?.battery?.percent + '%'}</TableCell>
            <TableCell align="right">{data?.temperature}</TableCell>
            <TableCell align="right">{data?.pressure}</TableCell>
            <TableCell align="right">{data?.humidity + '%'}</TableCell>
            <TableCell align="right">{data?.gas}</TableCell>
            <TableCell align="right">{data?.co2}</TableCell>
            <TableCell align="right">{data?.uv}</TableCell>
        </TableRow>
    );

}