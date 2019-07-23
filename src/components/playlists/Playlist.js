import React from "react";
import { connect } from "react-redux";
import { removeSongsFromPlaylist } from "../../redux/actions/playlistsActions";
import subsonic from "../../api/subsonicApi";
// UI
import SongsTable from '../songs/SongsTable'
import { Button } from 'rsuite';

class Playlist extends React.Component {

    constructor(props) {
        super(props)
        this.state = {selectedSongs : [], songs : [] }
    }
    
    async componentDidMount() {
        const playlist = await subsonic.getPlaylistById(this.props.playlistId)
        this.setState({songs : playlist.entry})
    }

    componentDidUpdate() {
        // Checked if songs were deleted to update the UI
        if( this.props.playlist &&
            (this.props.playlist.songCount < this.state.songs.length ) )
        {
            // Update state
            this.setState({
                songs : this.state.songs.filter((song, index) => !this.deletedIndexes.includes(index) ),
                selectedSongs : []
            })
        }
    }

    onSongsSelected = (selectedSongs) => {
        this.setState({selectedSongs: selectedSongs})
    }

    removeSelectedSongs = () => {
        if( this.state.selectedSongs.length > 0 ) {
            // Get indexes of this playlist because of stupid Subsonic API
            const selectedIndexes = this.state.selectedSongs.map( selectedSong => this.state.songs.findIndex(song => song.id === selectedSong.id) )
            this.deletedIndexes = selectedIndexes 
            // Call action
            this.props.removeSongsFromPlaylist( this.props.playlist, selectedIndexes)
        }
    }

    render() {
        const playlist = this.props.playlist || { name:"", songCount:0}
        const songs = this.state.songs
        const disableButton = this.state.selectedSongs && this.state.selectedSongs.length === 0
        return (
            <div style={{padding:"20px"}}>
                <h1 style={{color:"white", fontWeight:"bold", marginBottom:"15px", marginTop:"15px"}}>{playlist.name} ({playlist.songCount})</h1>
                <Button onClick={this.removeSelectedSongs} disabled={disableButton}>Remove from playlist</Button>
                <SongsTable songs={songs} onSongsSelected={this.onSongsSelected} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        "playlist" : state.playlists.byId[ownProps.playlistId]
    }
}

const mapDispatchToProps = { removeSongsFromPlaylist }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist)