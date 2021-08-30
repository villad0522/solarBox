import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

export const Tree = ({ children, src, name, settingButton, cableName }) => {
    const classes = useStyles();
    if (!Array.isArray(children)) {
        children = [];
    }
    const connectFlags = children.map(child => child.props.connectFlag);
    let connectTop = connectFlags.length;
    for (let i = connectFlags.length - 1; i >= 0; i--) {
        if (connectFlags[i]) {
            connectTop = i;
        }
    }
    let connectBottom = -1;
    for (let i = 0; i < connectFlags.length; i++) {
        if (connectFlags[i]) {
            connectBottom = i;
        }
    }
    return (
        <div className={classes.flexParent}>
            <div>
                <div className={classes.node}>
                    <Node src={src} name={name} settingButton={settingButton} />
                    <div className={classes.flexWrapperCable}>
                        <div
                            className={classes.nodeCable}
                            style={{
                                borderBottom: (connectBottom !== -1) ? '6px solid #0c0' : '6px solid #eee',
                            }}
                        >
                            <div className={classes.nameBox}>
                                {cableName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.flexWrapperChildren}>
                {
                    connectFlags.map((connectFlag, index) =>
                        <Child
                            key={index}
                            connectFlag={connectFlag}
                            topConnectFlag={(index >= connectTop)}
                            bottomConnectFlag={(index < connectBottom)}
                            bottomFlag={(index === connectFlags.length - 1)}
                            connectButton={children[index].props.connectButton}
                        >
                            {children[index]}
                        </Child>
                    )
                }
            </div>
        </div>
    );
}

export const Node = ({ src, name, settingButton }) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.nodeImgWrapper}>
                <div style={{ textAlign: 'right' }}>
                    {settingButton}
                </div>
                <img src={src} className={classes.nodeImg} alt="" />
            </div>
            <div style={{ textAlign: 'center' }}>
                {name}
                <br />
                <br />
            </div>
        </div>
    );
}

const Child = ({ children, connectFlag, topConnectFlag, bottomConnectFlag, bottomFlag, connectButton }) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.childFlexParent}>
                <div
                    className={classes.childCableVertical}
                    style={{
                        borderLeft: bottomFlag ? '6px solid #fff' :
                            topConnectFlag ? '6px solid #0c0' : '6px solid #eee',
                    }}
                />
                <div>
                    <div
                        className={classes.childCableHorizontal}
                        style={{
                            borderBottom: connectFlag ? '6px solid #0c0' : '6px solid #eee',
                            color: connectFlag ? '#0c0' : '#ccc',
                        }}
                    >
                        <div className={classes.nameBox}>
                            {connectFlag ? <CheckIcon /> : <CloseIcon />}
                        </div>
                        <div className={classes.connectButtonWrapper}>
                            {connectButton}
                        </div>
                    </div>
                </div>


                {children}
            </div >
            {
                bottomFlag ?
                    <div className={classes.stickyWrapper2}>
                        <div className={classes.cableWhite} />
                    </div>
                    :
                    <div className={classes.stickyWrapper}>
                        <div
                            className={classes.cableAbsolute}
                            style={{
                                borderLeft: bottomConnectFlag ? '6px solid #0c0' : '6px solid #eee',
                            }}
                        />
                    </div>
            }
        </>
    );
}

const PADDINNG_TOP = 10;
const BOX_SIZE = 50;

const useStyles = makeStyles((theme) => ({
    //======================================
    //
    flexParent: {
        display: 'flex',
    },
    //======================================
    // 横並び
    flexWrapperCable: {
        width: '80px',
    },
    flexWrapperChildren: {
        position: 'relative',
        top: '-' + (BOX_SIZE + PADDINNG_TOP) + 'px',
    },
    //======================================
    //
    node: {
        display: 'flex',
        position: 'sticky',
        top: PADDINNG_TOP + 'px',
    },
    nodeImgWrapper: {
        width: '100%',
        background: '#eee',
        borderRadius: '10px',
        textAlign: 'center',
    },
    nodeImg: {
        width: '100px',
    },
    nodeCable: {
        position: 'relative',
        minWidth: '100%',
        paddingTop: BOX_SIZE + 'px',
        marginBottom: '100%',
    },
    nameBox: {
        position: 'absolute',
        bottom: '0',
        textAlign: 'center',
        minWidth: '100%',
    },
    //======================================
    //
    childFlexParent: {
        position: 'relative',
        top: (BOX_SIZE + PADDINNG_TOP) + 'px',
        display: 'flex',
    },
    childCableVertical: {
        position: 'absolute',
        height: '100%',
        top: (BOX_SIZE + PADDINNG_TOP) + 'px',
        boxSizing: 'border-box',
    },
    childCableHorizontal: {
        position: 'sticky',
        top: PADDINNG_TOP + 'px',
        height: BOX_SIZE + 'px',
        width: '100px',
        marginBottom: '100px',
    },
    connectButtonWrapper: {
        position: 'absolute',
        width: '100%',
        top: '70px',
        textAlign: 'center',
    },
    //======================================
    //
    stickyWrapper: {
        position: 'sticky',
        top: (BOX_SIZE * 2 + PADDINNG_TOP) + 'px',
        zIndex: '10',
    },
    cableAbsolute: {
        position: 'absolute',
        top: '-' + (BOX_SIZE - 6) + 'px',
        height: '120vh',
        boxSizing: 'border-box',
    },
    //======================================
    //
    stickyWrapper2: {
        position: 'sticky',
        top: '0',
        zIndex: '10',
    },
    cableWhite: {
        position: 'absolute',
        top: '-' + (BOX_SIZE - 6) + 'px',
        height: '120vh',
        boxSizing: 'border-box',
        width: '60px',
        borderLeft: '6px solid #fff',
    },
    //======================================
    //
}));