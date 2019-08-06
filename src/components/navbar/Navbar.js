import React from 'react'
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { navigate } from "@reach/router"
// UI
import {Navbar, Icon, Nav, Dropdown } from 'rsuite'

class MyNavbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = { path : "/artists/" }
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
                        <Nav.Item eventKey="/search" icon={<Icon icon="search" />} active={this.isRouteActive("/search")} />
                        <Nav.Item eventKey="/artists/" icon={<Icon icon="group" />} active={this.isRouteActive("/artists")} />
                        <Nav.Item eventKey="/favourites/" icon={<Icon icon="star" />} active={this.isRouteActive("/favourites")} />
                        <Dropdown title="Playlists">
                            <Dropdown.Item eventKey="newPlaylist" icon={<Icon icon="plus" />} >New playlist</Dropdown.Item>
                            {Object.keys(playlists).map( id =>
                                <Dropdown.Item active={this.isRouteActive(`/playlist/${id}`)} key={id} eventKey={`/playlist/${id}`}>{playlists[id].name} ({playlists[id].songCount})</Dropdown.Item>
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