import React from 'react'
import PropTypes from 'prop-types'
// UI
import ThemePicker from '../ThemePicker'
import ScrobbleSetting from '../ScrobbleSetting'
import { Button, Row, Col, Divider } from 'rsuite'
// Utils
import * as utils from "../../utils/theming"

export default class SettingsView extends React.Component {

    constructor(props){
        super(props)
        this.themes = utils.getAvailableThemes()
    }

    onLogOut = () => {
        this.props.logout()
    }

    render() {
        const themes = this.themes
        return (
            <div style={{display:"flex", flexDirection:"column", padding:"20px", height:"100%", overflow:"auto"}}>
                <Row><h1>Settings</h1></Row>
                {/*Scrobble*/}
                <ScrobbleSetting />
                {/* Theme picker */}
                <h4 style={{marginTop:"15px"}}>Theme Picker</h4>
                <Row>
                <ThemePicker themes={themes} />
                </Row>
                {/*Log out*/}
                <div style={{flex:1}} />
                <Row>
                    <Col md={24}>
                        <Divider />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} md={8} mdOffset={8}>
                        <Button id="logoutButton" appearance="primary" onClick={this.onLogOut} block={true} size="lg" >Log out</Button>
                    </Col>
                </Row>
            </div>
        )
    }

}

SettingsView.propTypes = {
    logout : PropTypes.func.isRequired
}
