
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

const FlashGif = () => {
    const gifFileName = useSelector(state => state.gifFileName);
    const encoder = useSelector(state => state.encoder);
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