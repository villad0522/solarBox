import { connect } from 'react-redux'
import Component from '../components/TimeSchedule'
import actions from '../actions'

// ↓ 黒板に書いてある内容を、コンポーネントに教えてあげるプログラム
const mapStateToProps = (state, props) => {
}

// ↓ コンポーネントがクリックされたら、命令を発行するプログラム
const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleFullHour: (hour) => { dispatch(actions.toggleFullHour(hour)) },
        toggleFullMin: (min) => { dispatch(actions.toggleFullMin(min)) },
    }
}

export default connect(
    state => (mapStateToProps),
    dispatch => (mapDispatchToProps)
)(Component)