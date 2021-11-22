import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import actions from '../actions';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        overflowY: 'scroll',
        width: '100%',
    },
}));

const ColabSample = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [mist, setMist] = useState(useSelector(state => state.im920.mist.mist));
    const [led, setLed] = useState(useSelector(state => state.im920.mist.led));
    const [music, setMusic] = useState(useSelector(state => state.im920.mist.music));
    return (
        <div className={classes.wrapper}>
            <Container>
                <Box padding={3} />
                <Typography variant="h6">
                    ミスト
                </Typography>
                <RadioGroup
                    value={mist}
                    onChange={(event) => setMist(event.target.value)}
                >
                    <FormControlLabel control={<Radio />} value="0" label="常時OFF" />
                    <FormControlLabel control={<Radio />} value="1" label="常時ON" />
                    <FormControlLabel control={<Radio />} value="2" label="人がいるときだけON" />
                </RadioGroup>
                <Box padding={3} />
                <Typography variant="h6">
                    LED
                </Typography>
                <RadioGroup
                    value={led}
                    onChange={(event) => setLed(event.target.value)}
                >
                    <FormControlLabel control={<Radio />} value="0" label="常時OFF" />
                    <FormControlLabel control={<Radio />} value="1" label="常時ON" />
                    <FormControlLabel control={<Radio />} value="2" label="人がいるときだけON" />
                </RadioGroup>
                <Box padding={3} />
                <Typography variant="h6">
                    音楽
                </Typography>
                <RadioGroup
                    value={music}
                    onChange={(event) => setMusic(event.target.value)}
                >
                    <FormControlLabel control={<Radio />} value="0" label="常時OFF" />
                    <FormControlLabel control={<Radio />} value="1" label="常時「ゆりかごの唄」" />
                    <FormControlLabel control={<Radio />} value="2" label="常時「ブラームスの子守唄」" />
                    <FormControlLabel control={<Radio />} value="3" label="常時「ロッカバイ ベィビィ」" />
                    <FormControlLabel control={<Radio />} value="4" label="人が来たら「ゆりかごの唄」" />
                    <FormControlLabel control={<Radio />} value="5" label="人が来たら「ブラームスの子守唄」" />
                    <FormControlLabel control={<Radio />} value="6" label="人が来たら「ロッカバイ ベィビィ」" />
                </RadioGroup>
                <Box padding={3} />
                <Button
                    onClick={() => dispatch(actions.im920.mist.send(mist, led, music))}
                    variant="contained"
                    color="primary"
                >
                    OK
                </Button>
            </Container>
        </div>
    );
}
export default ColabSample