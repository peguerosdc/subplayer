import React from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { loginUser, lazyLoginUser } from "../../redux/actions/authActions";
// UI
import { Panel, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Alert } from 'rsuite';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props)
        this.user = {}
        this.state = {
            hostErrorMessage : null,
            userErrorMessage : null,
            passwordErrorMessage : null
        }
    }

    componentDidMount() {
        // Check if we need to lazy login
        if( !this.props.isAuthenticated ) {
            this.props.lazyLoginUser()
        }
        else {
            navigate("/artists")
        }
    }

    componentDidUpdate(prevProps) {
        // Check if we were waiting for an authentication update
        if( prevProps.isAuthenticating && !this.props.isAuthenticating ) {
            if( this.props.isAuthenticated ) {
                navigate("/artists")
            }
            else if(this.props.statusText) {
                Alert.error(this.props.statusText, 3000)
            }
        }
    }

    onUserDataChange = (value) => {
        this.user = value
    }

    login = () => {
        let valid = true
        // Check host
        let hostErrorMessage = null
        if( !this.user.host ) {
            valid = false
            hostErrorMessage = "Required"
        }
        // Check user
        let userErrorMessage = null
        if( !this.user.username ) {
            valid = false
            userErrorMessage = "Required"
        }
        // Check user
        let passwordErrorMessage = null
        if( !this.user.password ) {
            valid = false
            passwordErrorMessage = "Required"
        }
        this.setState({
            hostErrorMessage : hostErrorMessage,
            userErrorMessage : userErrorMessage,
            passwordErrorMessage : passwordErrorMessage
        })
        // Log in
        if( valid ){
            this.props.loginUser(this.user.host, this.user.username, this.user.password)
        }
    }

    render() {
        // Render all
        return (
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
                <Panel bordered style={{backgroundColor:"white"}}>
                    <Form onChange={this.onUserDataChange}>
                        <FormGroup>
                            <ControlLabel>Host</ControlLabel>
                            <FormControl name="host" type="url" errorMessage={this.state.hostErrorMessage} errorPlacement="bottomRight"/>
                            <HelpBlock>host:port. i.e. 192.154.323.3:8000</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl name="username" errorMessage={this.state.userErrorMessage} errorPlacement="bottomRight"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl name="password" type="password" errorMessage={this.state.passwordErrorMessage} errorPlacement="bottomRight"/>
                        </FormGroup>
                        <FormGroup>
                            <Button appearance="primary" loading={this.state.isAuthenticating} onClick={this.login} block>Log In</Button>
                        </FormGroup>
                      </Form>
                  </Panel>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating   : state.auth.isAuthenticating,
    isAuthenticated: state.auth.isAuthenticated,
    statusText         : state.auth.statusText,
})

const mapDispatchToProps = { loginUser, lazyLoginUser }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent)