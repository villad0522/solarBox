import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import actions from '../../actions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import FlashImages from './FlashImages';
import FlashGif from './FlashGif';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

export default function CustomizedDialogs({ children, testMode, }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const gifFileName = useSelector(state => state.gifFileName);
    const bitArray = useSelector(state => state.bitArray);

    const handleClickOpen = () => {
        if (testMode) {
            dispatch(actions.testFlash(testMode));
        }
        else {
            dispatch(actions.setBitArray());
        }
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        dispatch(actions.clearBitArray());
    };

    return (
        <div>
            <Button
                variant={testMode ? "text" : "contained"}
                style={{ color: testMode ? "#000" : "#fff" }}
                color="primary"
                onClick={handleClickOpen}
            >
                {children}
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle className={classes.root}>
                    {
                        gifFileName ?
                            <Typography variant="h6">
                                光センサーを<br />
                                押しあててください
                            </Typography>
                            : null
                    }
                    <IconButton className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {
                        bitArray.length ?
                            <div>
                                <FlashImages />
                                <FlashGif />
                            </div>
                            : null
                    }
                </DialogContent>
            </Dialog>
        </div>
    );
}
