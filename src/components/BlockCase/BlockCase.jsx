import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import DropArea from '../../containers/BlockCase/DropArea'
import DragItem from '../../containers/BlockCase/DragItem'

const useStyles = makeStyles((theme) => ({
    blockCase: {
        position: 'sticky',
        top: '0',
        overflow: 'hidden',
        height: '100vh',
        margin: '0 5%',
    },
}));

const BlockCase = () => {
    const classes = useStyles();
    const gridLength = 18;
    return (
        <div className={classes.blockCase}>
            <Box p={1} />
            <Grid container>
                {[...Array(gridLength)].map((_, i) =>
                    <Grid item sm={12} md={6} lg={4} xl={3} key={i}>
                        <DropArea dropAreaId={i}>
                            <DragItem dropAreaId={i} />
                        </DropArea>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
export default BlockCase