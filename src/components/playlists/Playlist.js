import React from "react";
import { connect } from "react-redux";
import { loadOnePlaylist } from "../../redux/actions/playlistsActions";

class Playlist extends React.Component {
    
    componentDidMount() {
        this.props.loadOnePlaylist(this.props.playlistId)
    }

    render() {
        var playlist = this.props.playlist ? this.props.playlist : { name:"", songCount:0}
        return (
            <div>
                <h1>{playlist.name} ({playlist.songCount})</h1>
                {
                    playlist.entry ?
                    playlist.entry.map(song => (<p key={song.id}>{song.title} - {song.artist}</p>))
                    : null
                }
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