import { connect } from 'react-redux'
import Component from '../components/FlashGif'
//import actions from '../actions'

// ↓ 黒板に書いてある内容を、コンポーネントに教えてあげるプログラム
const mapStateToProps = (state, props) => {
    return {
        gifFileName: state.gifFileName,
        encoder: state.encoder,
        ...props.other
    }
}

// ↓ コンポーネントがクリックされたら、命令を発行するプログラム
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(
    state => (mapStateToProps),
    dispatch => (mapDispatchToProps)
)(Component)