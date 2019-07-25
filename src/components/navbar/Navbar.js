import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
// UI
import {Navbar, Icon, Nav, Dropdown } from 'rsuite'

class MyNavbar extends React.Component {

    onNavSelected = (key) => {
        switch(key) {
            case "search":
                console.log("Not implemented")
                break
            case "newPlaylist":
                this.props.onCreatePlaylistTrigger && this.props.onCreatePlaylistTrigger()
                break
            case "logout":
                this.props.onLogOut && this.props.onLogOut()
                break
            default:
                this.props.onNavigateTo && this.props.onNavigateTo(key)
        }
    }

    render() {
        const playlists = this.props.playlists
        return (
            <Navbar>
                <Navbar.Body>
                    <Nav onSelect={this.onNavSelected}>
                        <Nav.Item eventKey="search" icon={<Icon icon="search" />} />
                        <Nav.Item eventKey="/artists/">Artists</Nav.Item>
                        <Dropdown title="Playlists">
                            <Dropdown.Item eventKey="newPlaylist" icon={<Icon icon="plus" />} >New playlist</Dropdown.Item>
                            {Object.keys(playlists).map( id =>
                                <Dropdown.Item key={id} eventKey={`/playlist/${id}`}>{playlists[id].name} ({playlists[id].songCount})</Dropdown.Item>
                            )}
                        </Dropdown>
                    </Nav>
                    <Nav onSelect={this.onNavSelected} pullRight>
                        <Nav.Item eventKey="logout">Log out</Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        "playlists" : state.playlists.byId,
    }
}

MyNavbar.propTypes = {
    onNavigateTo : PropTypes.func,
    onCreatePlaylistTrigger : PropTypes.func,
    onLogOut : PropTypes.func
}

export default connect(
    mapStateToProps,
    null
)(MyNavbar)