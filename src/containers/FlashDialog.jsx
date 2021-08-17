import { connect } from 'react-redux'
import Component from '../components/FlashDialog'
import actions from '../actions'

// ↓ 黒板に書いてある内容を、コンポーネントに教えてあげるプログラム
const mapStateToProps = (state, props) => {
    return {
        gifFileName: state.gifFileName,
        bitArray: state.bitArray,
        testMode: props.testMode,
        ...props.other
    }
}

// ↓ コンポーネントがクリックされたら、命令を発行するプログラム
const mapDispatchToProps = (dispatch, props) => {
    return {
        setBitArray: () => { dispatch(actions.setBitArray()) },
        clearBitArray: () => { dispatch(actions.clearBitArray()) },
        testFlash: (testMode) => { dispatch(actions.testFlash(testMode)) },
    }
}

export default connect(
    state => (mapStateToProps),
    dispatch => (mapDispatchToProps)
)(Component)