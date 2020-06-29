import React from 'react'
import PropTypes from 'prop-types'
import { navigate, Location } from "@reach/router"
// Redux
import { connect } from "react-redux"
// UI
import { Button, Icon, Divider, Nav } from 'rsuite'
import { ConnectedSearchBar } from "../search/SearchBar"
import "./sidebar.less"

export class Sidebar extends React.Component {

    showCreatePlaylistModal = () => {
        this.props.onCreatePlaylistTrigger && this.props.onCreatePlaylistTrigger()
    }

    onLogOut = () => {
        this.props.onLogOut && this.props.onLogOut()
    }

    onRouteSelected = (route) => {
        navigate(route)
    }

    render() {
        const playlists = this.props.playlists
        const currentPath = this.props.currentPath
        return (
            <div className="subsidebar rs-sidenav-default" >
                { /* Search bar */ }
                <ConnectedSearchBar />
                { /* Fixed-to-the-top section */ }
                <Nav activeKey={currentPath} onSelect={this.onRouteSelected} vertical>
                    <Nav.Item panel>
                        <h6 className="section-header">Library</h6>
                    </Nav.Item>
                    <Nav.Item eventKey="/latest" icon={<Icon icon="clock-o" />}>
                        Recently Added
                    </Nav.Item>
                    <Nav.Item eventKey="/artists" icon={<Icon icon="group" />}>
                        Artists
                    </Nav.Item>
                    <Nav.Item eventKey="/favourites" icon={<Icon icon="star" />}>
                        Favourites
                    </Nav.Item>
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
                        <Button id="logoutButton" appearance="link" block={true} onClick={this.onLogOut}>Log out</Button>
                    </Nav.Item>
                </Nav>
            </div>
        )
    }

}

Sidebar.propTypes = {
    onCreatePlaylistTrigger : PropTypes.func,
    onLogOut : PropTypes.func,
    playlists : PropTypes.object
}

Sidebar.defaultProps = {
    playlists : {}
}

const mapStateToProps = (state) => {
    return {
        "playlists" : state.playlists.byId,
    }
}

/* Create a Sidebar connected to Reach's location provider */

export class HOCSidebar extends React.Component {

    render() { 
        <Location>
            {
                props => {
                    // Get the location from reach's <Location/> to highlight the active item
                    const currentPath = props.location.pathname
                    return <Sidebar {...this.props} currentLocation={currentPath} />
                }
            }
        </Location>
    }

}

export default connect(
    mapStateToProps,
    null
)(HOCSidebar)