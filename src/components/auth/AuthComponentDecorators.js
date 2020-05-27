import React from "react"
import PropTypes from 'prop-types'
import { Redirect } from "@reach/router"
// Redux
import { connect } from "react-redux"
import { lazyLoginUser } from "../../redux/actions/authActions"

export class AuthenticatedComponent extends React.Component {

    componentDidMount() {
        // Check if we need to lazy login
        if( !this.props.isAuthenticated ) {
            this.props.lazyLoginUser && this.props.lazyLoginUser()
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.isAuthenticating === true
                        ? null : (
                            this.props.isAuthenticated === true
                                ? this.props.children
                                : <Redirect to="/login" noThrow/>  
                        )
                }
            </div>
        )

    }
}

AuthenticatedComponent.propTypes = {
    isAuthenticated : PropTypes.bool.isRequired,
    isAuthenticating : PropTypes.bool.isRequired,
    lazyLoginUser : PropTypes.func
}

AuthenticatedComponent.defaultProps = {
    isAuthenticated : false,
    isAuthenticating : false,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating
})

const mapDispatchToProps = { lazyLoginUser }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticatedComponent)