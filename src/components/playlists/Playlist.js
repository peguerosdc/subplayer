import React from "react";
import { connect } from "react-redux";
import { loadOnePlaylist } from "../../redux/actions/playlistsActions";
// UI
import SongsTable from '../songs/SongsTable'

class Playlist extends React.Component {
    
    componentDidMount() {
        this.props.loadOnePlaylist(this.props.playlistId)
    }

    render() {
        const playlist = this.props.playlist ? this.props.playlist : { name:"", songCount:0}
        const songs = playlist.entry ? playlist.entry : []
        return (
            <div style={{padding:"20px"}}>
                <h1>{playlist.name} ({playlist.songCount})</h1>
                <SongsTable songs={songs}  />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        "playlist" : state.playlists.playlists[ownProps.playlistId]
    }
}

const mapDispatchToProps = { loadOnePlaylist }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist)