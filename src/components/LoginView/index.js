// Redux
import { connect } from "react-redux"
import { loginUser, lazyLoginUser } from "../../redux/actions/authActions"
// UI
import LoginView from './LoginView'

const mapStateToProps = (state) => ({
    isAuthenticating   : state.auth.isAuthenticating,
    isAuthenticated: state.auth.isAuthenticated,
    statusText         : state.auth.statusText,
})

const mapDispatchToProps = { loginUser, lazyLoginUser }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView)