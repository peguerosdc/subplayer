import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from "@reach/router"
// Utils
import * as settings from "../../utils/settings.js"
// UI
import { Button, Icon, Divider, Nav } from 'rsuite'
import SearchBar from "../SearchBar"
import "./Sidebar.less"

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        // Check which items to display in the settings
        this.itemsToDisplay = settings.getSidebarDisplaySettings()
    }

    showCreatePlaylistModal = () => {
        this.props.onCreatePlaylistTrigger && this.props.onCreatePlaylistTrigger()
    }

    onRouteSelected = (route) => {
        navigate(route)
    }

    onShowSettings = () => {
        navigate("/settings")
    }

    render() {
        const playlists = this.props.playlists
        const currentPath = this.props.currentLocation
        return (
            <div className="subsidebar rs-sidenav-default" >
                { /* Search bar */ }
                <SearchBar />
                { /* Fixed-to-the-top section */ }
                <Nav activeKey={currentPath} onSelect={this.onRouteSelected} vertical>
                    <Nav.Item panel>
                        <h6 className="section-header">Library</h6>
                    </Nav.Item>
                    {
                        this.itemsToDisplay.map(item => (
                            <Nav.Item key={item.key} eventKey={item.key} icon={<Icon icon={item.icon} />}>
                                {item.text}
                            </Nav.Item>
                        ))
                    }
                    <Nav.Item panel>
                        <h6 className="section-header">Playlists ({Object.keys(playlists).length})</h6>
                    </Nav.Item>
                </Nav>
                { /* Scrollable playlists */ }
                <Nav activeKey={currentPath} onSelect={this.onRouteSelected} className="playlists-container" vertical>
                    {
                        Object.keys(playlists).map( id =>
                            <Nav.Item key={id} data-pid={id} eventKey={`/playlist/${id}`} >
                                {playlists[id].name} ({playlists[id].songCount}) 
                            </Nav.Item>
                        )
                    }
                </Nav>
                { /* Fixed-to-the-bottom options */ }
                <Nav activeKey={currentPath} onSelect={this.onRouteSelected} vertical>
                    <Divider className="footer-divider" />
                    <Nav.Item panel>
                        <Button id="createPlaylistButton" appearance="ghost" block={true} onClick={this.showCreatePlaylistModal} >Create new playlist</Button>
                    </Nav.Item>
                    <Nav.Item panel>
                        <Button id="settingsButton" appearance="link" block={true} onClick={this.onShowSettings}>Settings</Button>
                    </Nav.Item>
                </Nav>
            </div>
        )
    }

}

Sidebar.propTypes = {
    onCreatePlaylistTrigger : PropTypes.func,
    playlists : PropTypes.object
}

Sidebar.defaultProps = {
    playlists : {}
}
