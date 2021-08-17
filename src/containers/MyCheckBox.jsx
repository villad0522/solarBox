import { connect } from 'react-redux'
import Component from '../components/MyCheckBox'
import actions from '../actions'

// ↓ 黒板に書いてある内容を、コンポーネントに教えてあげるプログラム
const mapStateToProps = (state, props) => {
    return {
        checked: state.timeShedule[props.hour][props.min],
        ...props.other
    }
}

// ↓ コンポーネントがクリックされたら、命令を発行するプログラム
const mapDispatchToProps = (dispatch, props) => {
    return {
        setTimeShedule: (value) => { dispatch(actions.setTimeShedule(props.hour, props.min, value)) },
    }
}

export default connect(
    state => (mapStateToProps),
    dispatch => (mapDispatchToProps)
)(Component)