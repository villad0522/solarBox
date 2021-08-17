import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    gridWrapper: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: '5%',
        '&:hover': {
            cursor: 'grab',
        },
        '&:active': {
            cursor: 'grabbing',
        },
    },
    item: {
        padding: '10px',
        textAlign: 'center',
        boxSizing: 'border-box',
        background: '#fff',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        boxShadow: '-0.5px -0.5px 2px rgba(0, 0, 0, 0.3) inset',
    },
    dragging: {
        opacity: '0.3',
    },
}));

const DragItem = ({ browserId, dragItem, dropAreaId, setBlockCase }) => {
    const classes = useStyles();
    if (!dragItem) {
        return null;
    }
    const handleDragStart = (event) => {
        event.dataTransfer.setData("dragItem", JSON.stringify(dragItem));  // データ転送用のデータをセット
        event.dataTransfer.setData("browserId", browserId);                // データ転送用のデータをセット
        event.target.classList.add(classes.dragging);
    };
    const handleDragEnd = (event) => {
        event.target.classList.remove(classes.dragging);
    };
    const handleDrop = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setBlockCase(dropAreaId, event.dataTransfer);
    };
    return (
        <div
            className={classes.gridWrapper}
            draggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
        >
            <div className={classes.item}>
                {dragItem.id}
            </div>
        </div>
    );
}
export default DragItem