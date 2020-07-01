// Redux
import { connect } from "react-redux"
// UI
import AlertsManager from './AlertsManager'

const mapStateToProps = (state) => {
    return {
        alertToShow : state.alert
    }
}

export default connect(
    mapStateToProps,
    null
)(AlertsManager)