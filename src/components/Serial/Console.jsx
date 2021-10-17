import React from 'react';
import { useSelector } from 'react-redux'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    background: {
        background: 'black',
        color: 'white',
        height: '60vh',
        minWidth: '300px',
        overflowY: 'scroll',
        padding: '10px',
    },
    left: {
        textAlign: 'left',
    },
    right: {
        textAlign: 'right',
    },
    error: {
        color: 'red',
    },
}));

const SerialConsole = () => {
    const serialCommand = useSelector(state => state.serialCommand);
    const commands = serialCommand.commands;
    const progress = serialCommand.commandProgress;
    const errorMessages = serialCommand.errorMessages;
    const classes = useStyles();

    const ConsoleLists = [];

    for (let i = 0; (i < progress + 1) && (i < commands.length); i++) {
        const sendData = commands[i].sendData;
        ConsoleLists.push(
            <div key={"sendData-" + i} className={classes.left}>
                {sendData}
            </div>
        );
        const recieveDatas = commands[i].recieveDatas;
        for (let j = 0; j < recieveDatas.length; j++) {
            ConsoleLists.push(
                <div key={"recieveData-" + i + "-" + j} className={classes.right}>
                    {recieveDatas[j]}
                </div>
            );
        }
    }
    for (let i = 0; i < errorMessages.length; i++) {
        ConsoleLists.push(
            <div key={"errorMessage-" + i} className={classes.error}>
                {errorMessages[i]}
            </div>
        );
    }

    return (
        <div className={classes.background}>
            {ConsoleLists}
        </div>
    );
}
export default SerialConsole;
