import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'relative',
    },
    gridWrapper: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '5%',
    },
    grid: {
        width: '100%',
        paddingTop: '100%',
        borderRadius: '10px',
        boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.1) inset',
    },
    dropArea: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
    },
}));

const DropArea = ({ children, dropAreaId, setBlockCase }) => {
    const classes = useStyles();
    const handleDrop = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setBlockCase(dropAreaId, event.dataTransfer);
    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    return (
        <div className={classes.wrapper}>
            <div className={classes.gridWrapper}>
                <div className={classes.grid} />
            </div>
            <div
                className={classes.dropArea}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {children}
            </div>
        </div>
    );
}
export default DropArea