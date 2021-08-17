import { connect } from 'react-redux'
import Component from '../../components/BlockCase/DragItem'
import actions from '../../actions'

// ↓ 黒板に書いてある内容を、コンポーネントに教えてあげるプログラム
const mapStateToProps = (state, props) => {
    return {
        browserId: state.browserId,
        dragItem: state.blockCase[props.dropAreaId],
        dropAreaId: props.dropAreaId,
        ...props.other
    }
}

// ↓ コンポーネントがクリックされたら、命令を発行するプログラム
const mapDispatchToProps = (dispatch) => {
    return {
        setBlockCase: (dropAreaId, dataTransfer) => { dispatch(actions.setBlockCase(dropAreaId, dataTransfer)) },
    }
}

export default connect(
    state => (mapStateToProps),
    dispatch => (mapDispatchToProps)
)(Component)