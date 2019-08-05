import React from "react"
import { Redirect } from "@reach/router";
// Redux
import { connect } from "react-redux";
import { lazyLoginUser } from "../../redux/actions/authActions";

class AuthenticatedComponent extends React.Component {

    componentDidMount() {
        // Check if we need to lazy login
        if( !this.props.isAuthenticated ) {
            this.props.lazyLoginUser()
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

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating
})

const mapDispatchToProps = { lazyLoginUser }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticatedComponent)