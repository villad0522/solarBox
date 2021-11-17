import React from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CopyBlock, a11yDark } from "react-code-blocks";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        overflowY: 'scroll',
        width: '100%',
    },
    table: {
        width: '90%',
        margin: '0 auto',
    },
    tableHead: {
        background: '#eee',
        position: 'sticky',
        top: 0,
    },
    copyBlock: {
        position: 'sticky',
        top: 0,
    },
    button: {
        textTransform: 'none',
    }
}));

const ColabSample = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Container>
                <Box padding={3} />
                <Typography variant="h4">
                    サンプルプログラム
                </Typography>
                <Box padding={3} />
                <Button
                    variant="contained"
                    href="https://colab.research.google.com/"
                    color="primary"
                    target="_blank"
                    className={classes.button}
                >
                    Google Colaboratory を起動
                </Button>
                <Box padding={3} />
                JSONデータを表示するPythonプログラム
                <CopyBlock
                    language='python'
                    wrapLines
                    theme={a11yDark}
                    text='import requests
response = requests.get("https://tec-log2.azurewebsites.net/api/getSolarAll?code=oNgnwUM00BM2KCAt2LDb/yccjS9GNs87MXFuk5aRrIPvSPRZpQ3ViQ==")
print( response.json() )'
                />
                <Box padding={3} />
                ４回前の計測データの気温を表示するPythonプログラム
                <CopyBlock
                    language='python'
                    wrapLines
                    theme={a11yDark}
                    text='import requests
response = requests.get("https://tec-log2.azurewebsites.net/api/getSolarAll?code=oNgnwUM00BM2KCAt2LDb/yccjS9GNs87MXFuk5aRrIPvSPRZpQ3ViQ==")
temp = response.json()[4]["temperature"]
print(temp)'
                />
                <Box padding={3} />
                14回前の計測データの発電量（電力）を表示するPythonプログラム
                <CopyBlock
                    language='python'
                    wrapLines
                    theme={a11yDark}
                    text='import requests
response = requests.get("https://tec-log2.azurewebsites.net/api/getSolarAll?code=oNgnwUM00BM2KCAt2LDb/yccjS9GNs87MXFuk5aRrIPvSPRZpQ3ViQ==")
power = response.json()[14]["solar"]["power"]
print(power)'
                />
                <Box padding={3} />
            </Container>
        </div>
    );
}
export default ColabSample