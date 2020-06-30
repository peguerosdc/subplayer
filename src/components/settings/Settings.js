import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { logout } from "../../redux/actions/authActions"
// UI
import ThemePicker from '../theming/ThemePicker'
import { Button, Row, Col, Divider } from 'rsuite'

export class Settings extends React.Component {

    onLogOut = () => {
        this.props.logout()
    }

    render() {
        return (
            <div style={{display:"flex", flexDirection:"column", padding:"20px", height:"100%", overflow:"auto"}}>
                <Row><h1>Settings</h1></Row>
                {/* Theme picker */}
                <h4 style={{marginTop:"15px"}}>Theme Picker</h4>
                <Row>
                <ThemePicker />
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
                        <Button color="primary" onClick={this.onLogOut} block={true} size="lg" >Log out</Button>
                    </Col>
                </Row>
            </div>
        )
    }

}

Settings.propTypes = {
    logout : PropTypes.func.isRequired
}

const mapDispatchToProps = { logout }

export default connect(
    null,
    mapDispatchToProps
)(Settings)