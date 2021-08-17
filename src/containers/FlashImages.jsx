import { connect } from 'react-redux'
import Component from '../components/FlashImages'
import actions from '../actions'

// ↓ 黒板に書いてある内容を、コンポーネントに教えてあげるプログラム
const mapStateToProps = (state, props) => {
    return {
        bitArray: state.bitArray,
        ...props.other
    }
}

// ↓ コンポーネントがクリックされたら、命令を発行するプログラム
const mapDispatchToProps = (dispatch) => {
    return {
        convertGif: (canvasElement, imgElements) => { dispatch(actions.convertGif(canvasElement, imgElements)) },
    }
}

export default connect(
    state => (mapStateToProps),
    dispatch => (mapDispatchToProps)
)(Component)