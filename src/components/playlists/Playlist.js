import React from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router"
import { removeSongsFromPlaylist, deletePlaylist } from "../../redux/actions/playlistsActions";
import subsonic from "../../api/subsonicApi";
import { seconds_to_hhmmss } from "../../utils/formatting.js"
// UI
import SongsTable from '../songs/SongsTable'
import { Button, Modal, Icon } from 'rsuite';

class Playlist extends React.Component {

    constructor(props) {
        super(props)
        this.state = {selectedSongs : [], songs : [], showModal : false, waitingForDeletion: false }
    }
    
    async componentDidMount() {
        const playlist = await subsonic.getPlaylistById(this.props.playlistId)
        this.setState({songs : playlist.entry || []})
    }

    componentDidUpdate() {
        if( this.props.playlist ) {
            if( this.props.playlist.songCount < this.state.songs.length ) {
                // Update state
                this.setState({
                    songs : this.state.songs.filter((song, index) => !this.deletedIndexes.includes(index) ),
                    selectedSongs : []
                })
            }
        }
        else if( this.waitingForDeletion ) {
            navigate("/")
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

    askDeletionConfirmation = () => {
        this.setState({showModal:true})
    }

    closeModalAndDelete = () => {
        this.waitingForDeletion = true
        this.setState({showModal:false})
        this.props.deletePlaylist( this.props.playlist )
    }

    closeModal = () => {
        this.setState({showModal:false})
    }

    render() {
        const playlist = this.props.playlist || { name:"", songCount:0, duration:0 }
        const songs = this.state.songs
        const disableButton = this.state.selectedSongs && this.state.selectedSongs.length === 0
        return (
            <div style={{padding:"20px"}}>
                <div style={{ display:"flex", flexFlow: "row", marginBottom:"15px", marginTop:"15px"}}>
                    <div style={{flexGrow:1}}>
                        <h1 style={{color:"white", fontWeight:"bold"}}>{playlist.name}</h1>
                        <span>{playlist.songCount} songs, {seconds_to_hhmmss(playlist.duration)} </span>
                    </div>
                    <div style={{ display:"flex", flexFlow: "column"}}>
                        <Button color="red" onClick={this.askDeletionConfirmation} style={{marginBottom:"5px"}}>Delete playlist</Button>
                        <Button onClick={this.removeSelectedSongs} disabled={disableButton}>Remove from playlist</Button>
                    </div>
                </div>
                <SongsTable songs={songs} onSongsSelected={this.onSongsSelected} />
                {/* Playlist deletion confirmation */}
                <Modal backdrop="static" show={this.state.showModal} onHide={this.closeModal} size="xs">
                    <Modal.Body>
                        <Icon icon="remind" style={{ color: '#ffb300', fontSize: 24 }} />
                        {'  '}
                        Once a playlist is deleted, it can't be recovered. Are you sure you want to proceed?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModalAndDelete} appearance="primary"> Ok </Button>
                        <Button onClick={this.closeModal} appearance="subtle"> Cancel </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        "playlist" : state.playlists.byId[ownProps.playlistId]
    }
}

const mapDispatchToProps = { removeSongsFromPlaylist, deletePlaylist }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist)