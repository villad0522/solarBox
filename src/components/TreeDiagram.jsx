import React from 'react';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export const Tree = ({ children, src, name, actionButtons, leftCableName }) => {
    const classes = useStyles();
    if (!children) {
        children = [];
    }
    else if (!Array.isArray(children)) {
        children = [children];
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
        <div className={classes.tree}>
            <div className={classes.parent}>
                <div className={classes.nodeWrapper}>
                    <div className={classes.grayBox}>
                        <div className={classes.name}>
                            {name}
                        </div>
                        <img src={src} className={classes.nodeImg} alt="" />
                        <div className={classes.action}>
                            {actionButtons}
                        </div>
                    </div>
                    <div
                        className={classes.nodeCable}
                        style={{
                            borderBottom: (connectBottom !== -1) ? '6px solid #0c0' : '6px solid #eee',
                        }}
                    >
                        <div className={classes.leftCableName}>
                            {leftCableName}
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.children}>
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

const Child = ({ children, connectFlag, topConnectFlag, bottomConnectFlag, bottomFlag, connectButton }) => {
    const classes = useStyles();
    return (
        <>
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
            <div className={classes.child}>
                <div>
                    <div className={classes.cableLeftWrapper}>
                        <div
                            className={classes.cableLeft}
                            style={{
                                borderLeft: bottomFlag ? 'none' :
                                    topConnectFlag ? '6px solid #0c0' : '6px solid #eee',
                                background: '#fff',
                                color: connectFlag ? '#0c0' : '#ccc',
                            }}
                        >
                            <div
                                style={{
                                    borderTop: connectFlag ? '6px solid #0c0' : '6px solid #eee',
                                }}
                            />
                            <div className={classes.connectIcon}>
                                {connectFlag ? <CheckIcon /> : <CloseIcon />}
                            </div>
                            <div className={classes.connectButton}>
                                {connectButton}
                            </div>
                        </div>
                    </div>
                </div>
                {children}
            </div >
        </>
    );
}

const PADDINNG_TOP = 60;
const BOX_SIZE = 40;

const useStyles = makeStyles((theme) => ({
    //======================================
    //
    tree: {
        display: 'flex',
    },
    parent: {
        paddingTop: PADDINNG_TOP + 'px',
    },
    //======================================
    // 横並び
    children: {
        position: 'relative',
    },
    //======================================
    //
    nodeWrapper: {
        height: (BOX_SIZE * 2 + 30) + 'px',
        display: 'flex',
        position: 'sticky',
        top: PADDINNG_TOP + 'px',
    },
    grayBox: {
        position: 'relative',
        minWidth: '0',
        width: (BOX_SIZE * 2) + 'px',
        maxWidth: (BOX_SIZE * 2) + 'px',
        height: (BOX_SIZE * 2) + 'px',
        background: '#eee',
        borderRadius: '10px',
        textAlign: 'center',
    },
    nodeImg: {
        paddingTop: '5%',
        width: '90%',
    },
    nodeCable: {
        minWidth: '20px',
        position: 'relative',
        height: BOX_SIZE + 'px',
    },
    leftCableName: {
        position: 'relative',
        top: (BOX_SIZE - 20) + 'px',
        paddingLeft: '5px',
        textAlign: 'left',
        color: '#aaa',
        fontSize: '14px',
        width: 'max-content'
    },
    name: {
        position: 'absolute',
        left: '-50vh',
        right: '-50vh',
        bottom: (BOX_SIZE * 2) + 'px',
        textAlign: 'center',
        minWidth: '100%',
        zIndex: '-1',
    },
    connectIcon: {
        position: 'absolute',
        top: '5px',
        textAlign: 'center',
        minWidth: '100%',
    },
    connectButton: {
        position: 'absolute',
        top: '-35px',
        textAlign: 'center',
        minWidth: '100%',
    },
    action: {
        position: 'absolute',
        top: (BOX_SIZE * 2) + 'px',
        textAlign: 'right',
        minWidth: '100%',
        width: 'max-content',
    },
    child: {
        position: 'relative',
        display: 'flex',
        boxSizing: 'border-box',
        width: 'min-content',
    },
    cableLeftWrapper: {
        position: 'sticky',
        top: '0px',
        width: '100px',
        paddingBottom: ((BOX_SIZE * 2) + PADDINNG_TOP) + 'px',
    },
    cableLeft: {
        position: 'absolute',
        width: '100%',
        top: (BOX_SIZE + PADDINNG_TOP) + 'px',
        height: '120vh',
    },
    //======================================
    //
    stickyWrapper: {
        position: 'sticky',
        top: '0',
        zIndex: '10',
    },
    cableAbsolute: {
        position: 'absolute',
        top: (BOX_SIZE + PADDINNG_TOP + 6) + 'px',
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
        top: (BOX_SIZE + PADDINNG_TOP + 6) + 'px',
        height: '120vh',
        boxSizing: 'border-box',
        borderLeft: '6px solid #fff',
    },
    //======================================
    //
}));