import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
// UI
import { Button, Icon, Divider } from 'rsuite';
import SearchBar from "../search/SearchBar"
import "./sidebar.less"

class Sidebar extends React.Component {

    isSelected = (link) => this.state.path.startsWith(link)

    showCreatePlaylistModal = () => {
        this.props.onCreatePlaylistTrigger && this.props.onCreatePlaylistTrigger()
    }

    onLogOut = () => {
        this.props.onLogOut && this.props.onLogOut()
    }

    isRouteActive = (activeObject) => {
        return activeObject.isPartiallyCurrent ? { className : "selectableRow selected" } : { className : "selectableRow" }
    }

    render() {
        const playlists = this.props.playlists
        return (
            <div style={{padding:"10px", display:"flex", flexDirection:"column", height:"100%"}}>

                <SearchBar />

                <h3 className="title">LIBRARY</h3>

                <Link to="/artists" getProps={this.isRouteActive} >
                    <Icon icon='group'/>{' '}Artists
                </Link>

                <Link to="/favourites" getProps={this.isRouteActive} >
                    <Icon icon='star'/>{' '}Favourites
                </Link>

                <h3 className="title">PLAYLISTS ({Object.keys(playlists).length})</h3>

                <div style={{flexGrow:1, display:"flex", flexDirection:"column", overflow:"auto"}}>
                {
                    Object.keys(playlists).map( id =>
                        <Link key={id} to={`/playlist/${id}`} getProps={this.isRouteActive} >
                                    {playlists[id].name} ({playlists[id].songCount})
                            
                        </Link>
                    )
                }
                </div>
                <Divider style={{margin:"15px 0"}} />
                <Button appearance="ghost" block={true} onClick={this.showCreatePlaylistModal} >Create new playlist</Button>
                <Button appearance="link" block={true} onClick={this.onLogOut}>Log out</Button>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        "playlists" : state.playlists.byId,
    }
}

Sidebar.propTypes = {
    onCreatePlaylistTrigger : PropTypes.func,
    onLogOut : PropTypes.func
}

export default connect(
    mapStateToProps,
    null
)(Sidebar)