import React from 'react';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import OfflineBoltOutlinedIcon from '@mui/icons-material/OfflineBoltOutlined';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';


const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: 'large',
    },
    checked: {
        color: theme.palette.primary.main,
    },
}));


const MyCheckBox = ({ checked, setTimeShedule, ...other }) => {
    const classes = useStyles();
    return (
        <Checkbox
            icon={<OfflineBoltOutlinedIcon />}
            checkedIcon={<OfflineBoltIcon />}
            color="default"
            checked={checked}
            onChange={event => setTimeShedule(event.target.checked)}
            classes={{
                root: classes.root,
                checked: classes.checked,
            }}
            {...other}
        />
    );
}
export default MyCheckBox;