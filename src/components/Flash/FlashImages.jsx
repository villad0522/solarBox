
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import BitImg0 from '../img/0.svg';
import BitImg1 from '../img/1.svg';
import BitImg2 from '../img/2.svg';
import BitImg3 from '../img/3.svg';
import BitImg4 from '../img/4.svg';
import BitImg5 from '../img/5.svg';
import BitImg6 from '../img/6.svg';
import BitImg7 from '../img/7.svg';
import BitImg8 from '../img/8.svg';
import BitImg9 from '../img/9.svg';
import BitImg10 from '../img/10.svg';
import BitImg11 from '../img/11.svg';
import BitImg12 from '../img/12.svg';
import BitImg13 from '../img/13.svg';
import BitImg14 from '../img/14.svg';
import BitImg15 from '../img/15.svg';

const BitImg = [
    BitImg0,
    BitImg1,
    BitImg2,
    BitImg3,
    BitImg4,
    BitImg5,
    BitImg6,
    BitImg7,
    BitImg8,
    BitImg9,
    BitImg10,
    BitImg11,
    BitImg12,
    BitImg13,
    BitImg14,
    BitImg15,
];

const useStyles = makeStyles((theme) => ({
    hidden: {
        display: 'none',
        height: 0,
    },
    flashWrapper: {
        width: '172px',
        height: '172px',
        overflow: 'hidden',
        borderColor: '#aaa',
        borderStyle: 'solid',
        borderWidth: '10px',
    },
}));

const FlashImages = ({ bitArray, convertGif }) => {
    const classes = useStyles();
    const canvasElement = useRef(null);
    const imgElements = bitArray.map(() => useRef(null));
    //
    useEffect(() => {
        convertGif(canvasElement, imgElements);
    }, [canvasElement, imgElements]);
    //
    return (
        <div className={classes.hidden}>
            {
                bitArray.map((bits, index) =>
                    <img
                        alt=""
                        ref={imgElements[index]}
                        src={BitImg[bits]}
                        key={index}
                    />
                )
            }
            <canvas ref={canvasElement} />
        </div>
    );
}
export default FlashImages;