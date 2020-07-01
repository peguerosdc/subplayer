// Redux
import { connect } from "react-redux"
import { logout } from "../../redux/actions/authActions"
// UI
import SettingsView from './SettingsView'

const mapDispatchToProps = { logout }

export default connect(
    null,
    mapDispatchToProps
)(SettingsView)