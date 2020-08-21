import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from "@reach/router"
// UI
import {Navbar, Icon, Nav, Dropdown } from 'rsuite'

export default class MyNavbar extends React.Component {

    onNavSelected = (key) => {
        switch(key) {
            case "newPlaylist":
                this.props.onCreatePlaylistTrigger && this.props.onCreatePlaylistTrigger()
                break
            default:
                navigate(key)
        }
    }

    render() {
        const playlists = this.props.playlists
        const currentPath = this.props.currentLocation
        return (
            <Navbar>
                <Navbar.Body>
                    <Nav activeKey={currentPath} onSelect={this.onNavSelected}>
                        <Nav.Item id="search" eventKey="/search" icon={<Icon icon="search" />} />
                        <Dropdown id="library" title="Library">
                            <Dropdown.Item id="latest" eventKey="/latest/" icon={<Icon icon="clock-o" />} >Recently Added</Dropdown.Item>
                            <Dropdown.Item id="artists" eventKey="/artists/" icon={<Icon icon="group" />} >Artists</Dropdown.Item>
                            <Dropdown.Item id="album" eventKey="/album/" icon={<Icon icon="th2" />} >Albums</Dropdown.Item>
                            <Dropdown.Item id="favourites" eventKey="/favourites/" icon={<Icon icon="star" />} >Favourites</Dropdown.Item>
                        </Dropdown>
                        <Dropdown id="playlists" title="Playlists">
                            <Dropdown.Item id="createPlaylist" eventKey="newPlaylist" icon={<Icon icon="plus" />} >New playlist</Dropdown.Item>
                            {Object.keys(playlists).map( id =>
                                <Dropdown.Item key={id} eventKey={`/playlist/${id}`}>{playlists[id].name} ({playlists[id].songCount})</Dropdown.Item>
                            )}
                        </Dropdown>
                    </Nav>
                    <Nav activeKey={currentPath} onSelect={this.onNavSelected} pullRight>
                        <Nav.Item id="settings" eventKey="/settings" icon={<Icon icon="cog" />} />
                    </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}

MyNavbar.propTypes = {
    onCreatePlaylistTrigger : PropTypes.func,
    playlists : PropTypes.object.isRequired
}

MyNavbar.defaultProps = {
    playlists : {}
}
