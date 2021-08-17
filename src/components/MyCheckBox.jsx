import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';


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