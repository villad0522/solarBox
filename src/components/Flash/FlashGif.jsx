
import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

//const useStyles = makeStyles((theme) => ({
//}));

const FlashGif = ({ gifFileName, encoder }) => {
    //const classes = useStyles();
    //
    if (gifFileName) {
        const downloadGIF = () => {
            encoder.download("download.gif");
        }
        return (
            <div>
                <img src={gifFileName} alt="" />
                <p>
                    <button onClick={downloadGIF}>
                        ダウンロード
                    </button>
                </p>
            </div>
        );
    }
    else {
        return <CircularProgress />
    }
}
export default FlashGif;