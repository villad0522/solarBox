import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import MyCheckbox from '../containers/MyCheckBox';

const useStyles = makeStyles((theme) => ({
    table: {
        margin: '0 auto',
        textAlign: 'center',
    },
    tableHead: {
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 3,
    },
    min: {
        margin: '10px 0',
        color: '#aaa',
    },
    hour: {
        color: '#aaa',
    },
}));

const TableRow = ({ toggleFullHour, hour }) => {
    const classes = useStyles();
    return (
        <tr>
            <th>
                <Button onClick={() => toggleFullHour(hour)} className={classes.hour}>
                    {hour}時
                </Button>
            </th>
            <td>
                <MyCheckbox hour={hour} min={0} />
            </td>
            <td>
                <MyCheckbox hour={hour} min={1} />
            </td>
            <td>
                <MyCheckbox hour={hour} min={2} />
            </td>
            <td>
                <MyCheckbox hour={hour} min={3} />
            </td>
        </tr>
    )
}

const TimeSchedule = ({ toggleFullHour, toggleFullMin }) => {
    const classes = useStyles();
    return (
        <table className={classes.table}>
            <thead className={classes.tableHead}>
                <tr>
                    <th></th>
                    <th>
                        <Button onClick={() => toggleFullMin(0)} className={classes.min}>
                            0分
                        </Button>
                    </th>
                    <th>
                        <Button onClick={() => toggleFullMin(1)} className={classes.min}>
                            15分
                        </Button>
                    </th>
                    <th>
                        <Button onClick={() => toggleFullMin(2)} className={classes.min}>
                            30分
                        </Button>
                    </th>
                    <th>
                        <Button onClick={() => toggleFullMin(3)} className={classes.min}>
                            45分
                        </Button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <TableRow toggleFullHour={toggleFullHour} hour={0} />
                <TableRow toggleFullHour={toggleFullHour} hour={1} />
                <TableRow toggleFullHour={toggleFullHour} hour={2} />
                <TableRow toggleFullHour={toggleFullHour} hour={3} />
                <TableRow toggleFullHour={toggleFullHour} hour={4} />
                <TableRow toggleFullHour={toggleFullHour} hour={5} />
                <TableRow toggleFullHour={toggleFullHour} hour={6} />
                <TableRow toggleFullHour={toggleFullHour} hour={7} />
                <TableRow toggleFullHour={toggleFullHour} hour={8} />
                <TableRow toggleFullHour={toggleFullHour} hour={9} />
                <TableRow toggleFullHour={toggleFullHour} hour={10} />
                <TableRow toggleFullHour={toggleFullHour} hour={11} />
                <TableRow toggleFullHour={toggleFullHour} hour={12} />
                <TableRow toggleFullHour={toggleFullHour} hour={13} />
                <TableRow toggleFullHour={toggleFullHour} hour={14} />
                <TableRow toggleFullHour={toggleFullHour} hour={15} />
                <TableRow toggleFullHour={toggleFullHour} hour={16} />
                <TableRow toggleFullHour={toggleFullHour} hour={17} />
                <TableRow toggleFullHour={toggleFullHour} hour={18} />
                <TableRow toggleFullHour={toggleFullHour} hour={19} />
                <TableRow toggleFullHour={toggleFullHour} hour={20} />
                <TableRow toggleFullHour={toggleFullHour} hour={21} />
                <TableRow toggleFullHour={toggleFullHour} hour={22} />
                <TableRow toggleFullHour={toggleFullHour} hour={23} />
            </tbody>
        </table>
    );
}
export default TimeSchedule