// Redux
import { connect } from "react-redux"
import { lazyLoginUser } from "../../redux/actions/authActions"
// UI
import AuthenticatedComponent from './AuthenticatedComponent'

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating
})

const mapDispatchToProps = { lazyLoginUser }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticatedComponent)