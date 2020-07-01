import React from "react"
import PropTypes from 'prop-types'
import { Redirect } from "@reach/router"
// UI
import { Loader } from 'rsuite';

export default class AuthenticatedComponent extends React.Component {

    componentDidMount() {
        // Check if we need to lazy login
        if( !this.props.isAuthenticated ) {
            this.props.lazyLoginUser && this.props.lazyLoginUser()
        }
    }

    render() {
        const authenticatingView = (<div id="loading" style={{height:"100vh", display:"flex"}}><Loader style={{margin:"auto"}} size="lg" content="Loading..." vertical /></div>)
        return (
            <div>
                {
                    this.props.isAuthenticating === true
                        ? authenticatingView : (
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
