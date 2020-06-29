import React from 'react'
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { navigate, Location } from "@reach/router"
// UI
import {Navbar, Icon, Nav, Dropdown } from 'rsuite'

export class MyNavbar extends React.Component {

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
        }
    }

    render() {
        const playlists = this.props.playlists
        const currentPath = this.props.currentPath
        return (
            <Navbar>
                <Navbar.Body>
                    <Nav activeKey={currentPath} onSelect={this.onNavSelected}>
                        <Nav.Item id="search" eventKey="/search" icon={<Icon icon="search" />} />
                        <Nav.Item id="latest" eventKey="/latest/" icon={<Icon icon="clock-o" />} />
                        <Nav.Item id="artists" eventKey="/artists/" icon={<Icon icon="group" />} />
                        <Nav.Item id="favourites" eventKey="/favourites/" icon={<Icon icon="star" />} />
                        <Dropdown id="playlists" title="Playlists">
                            <Dropdown.Item id="createPlaylist" eventKey="newPlaylist" icon={<Icon icon="plus" />} >New playlist</Dropdown.Item>
                            {Object.keys(playlists).map( id =>
                                <Dropdown.Item key={id} eventKey={`/playlist/${id}`}>{playlists[id].name} ({playlists[id].songCount})</Dropdown.Item>
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

MyNavbar.propTypes = {
    onCreatePlaylistTrigger : PropTypes.func,
    onLogOut : PropTypes.func,
    playlists : PropTypes.object.isRequired
}

MyNavbar.defaultProps = {
    playlists : {}
}

const mapStateToProps = (state) => {
    return {
        "playlists" : state.playlists.byId,
    }
}

/* Create a Navbar connected to Reach's location provider */

export class HOCNavbar extends React.Component {

    render() { 
        <Location>
            {
                props => {
                    // Get the location from reach's <Location/> to highlight the active item
                    const currentPath = props.location.pathname
                    return <MyNavbar {...this.props} currentLocation={currentPath} />
                }
            }
        </Location>
    }

}

export default connect(
    mapStateToProps,
    null
)(HOCNavbar)