import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import FlashImages from '../containers/FlashImages';
import FlashGif from '../containers/FlashGif';

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

export default function CustomizedDialogs({ children, bitArray, gifFileName, setBitArray, clearBitArray, testFlash, testMode, }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (testMode) {
            testFlash(testMode);
        }
        else {
            setBitArray();
        }
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        clearBitArray();
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
