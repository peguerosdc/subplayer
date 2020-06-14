import React from 'react'
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { navigate } from "@reach/router"
// UI
import {Navbar, Icon, Nav, Dropdown } from 'rsuite'

export class MyNavbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = { path : "/latest/" }
    }

    onNavSelected = (key) => {
        switch(key) {
            case "newPlaylist":
                this.props.onCreatePlaylistTrigger && this.props.onCreatePlaylistTrigger()
                break
            case "logout":
                this.props.onLogOut && this.props.onLogOut()
                break
            default:
                navigate(key)
                this.setState({path : key})
        }
    }

    isRouteActive = (route) => {
        return this.state.path.startsWith(route)
    }

    render() {
        const playlists = this.props.playlists
        return (
            <Navbar>
                <Navbar.Body>
                    <Nav onSelect={this.onNavSelected}>
                        <Nav.Item id="search" eventKey="/search" icon={<Icon icon="search" />} active={this.isRouteActive("/search")} />
                        <Nav.Item id="latest" eventKey="/latest/" icon={<Icon icon="clock-o" />} active={this.isRouteActive("/latest")} />
                        <Nav.Item id="artists" eventKey="/artists/" icon={<Icon icon="group" />} active={this.isRouteActive("/artists")} />
                        <Nav.Item id="favourites" eventKey="/favourites/" icon={<Icon icon="star" />} active={this.isRouteActive("/favourites")} />
                        <Dropdown id="playlists" title="Playlists">
                            <Dropdown.Item id="createPlaylist" eventKey="newPlaylist" icon={<Icon icon="plus" />} >New playlist</Dropdown.Item>
                            {Object.keys(playlists).map( id =>
                                <Dropdown.Item active={this.isRouteActive(`/playlist/${id}`)} key={id} eventKey={`/playlist/${id}`}>{playlists[id].name} ({playlists[id].songCount})</Dropdown.Item>
                            )}
                        </Dropdown>
                    </Nav>
                    <Nav onSelect={this.onNavSelected} pullRight>
                        <Nav.Item id="logout" eventKey="logout" icon={<Icon icon="sign-out" />} />
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
    onCreatePlaylistTrigger : PropTypes.func,
    onLogOut : PropTypes.func,
    playlists : PropTypes.object.isRequired
}

MyNavbar.defaultProps = {
    playlists : {}
}

export default connect(
    mapStateToProps,
    null
)(MyNavbar)