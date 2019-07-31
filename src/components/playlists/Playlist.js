import React from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router"
import { removeSongsFromPlaylist, deletePlaylist, editPlaylist, loadSinglePlaylist } from "../../redux/actions/playlistsActions";
import { seconds_to_hhmmss } from "../../utils/formatting.js"
// UI
import SongsTable from '../songs/SongsTable'
import { Button, Modal, Icon, IconButton, Form, FormGroup, ControlLabel, Checkbox, Input } from 'rsuite';

const NOT_MINE_COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.artist, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.download]
const MINE_COLUMNS_TO_SHOW = [...NOT_MINE_COLUMNS_TO_SHOW, SongsTable.columns.selectable]

class Playlist extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {selectedSongs : [], showDeleteModal : false, waitingForDeletion: false,
            showEditModal : false, editNameError : false}
        this.tempPlaylist = {}
        this.deletedIndexes = []
    }
    
    componentDidMount() {
        this.props.loadSinglePlaylist(this.props.playlistId)
    }

    async componentDidUpdate(prevProps) {
        // Check if the playlist was deleted: it doesnt exist and we dispatched a deletion request
        // Alternative: Navigate on deletion without waiting for confirmation
        // Important: this has to be the first condition
        if(!this.props.playlist && this.waitingForDeletion ) {
            navigate("/")
        }
        else if( this.props.playlistId ) {
            // Update if the playlist has changed
            if( this.props.playlistId !== prevProps.playlistId ) {
                this.setState({selectedSongs: []})
                this.props.loadSinglePlaylist(this.props.playlistId)
            }
        }
    }

    onSongsSelected = (selectedSongs) => {
        this.setState({selectedSongs: selectedSongs})
    }

    removeSelectedSongs = () => {
        if( this.state.selectedSongs.length > 0 ) {
            // Get indexes of this playlist because of stupid Subsonic API
            const selectedIndexes = this.state.selectedSongs.map( selectedSong => this.props.songs.findIndex(song => song.id === selectedSong.id) )
            this.deletedIndexes = selectedIndexes 
            // Call action
            this.props.removeSongsFromPlaylist( this.props.playlist, selectedIndexes)
        }
    }

    setTempPlaylistToDefault = (playlist) => {
        this.tempPlaylist = { name: playlist.name, comment : playlist.comment, public : playlist.public }
    }

    formatExternalPlaylistName = (name) => {
        const regex = /^\[.*?\] /
        return name.replace(regex, "")
    }

    /* Edition modal */

    triggerEditModal = () => {
        this.setTempPlaylistToDefault(this.props.playlist)
        this.setState({showEditModal:true})
    }

    closeEditModal = () => {
        this.setState({showEditModal:false, editNameError : false})
        this.setTempPlaylistToDefault(this.props.playlist)
    }

    closeModalAndEdit = (e) => {
        // Do not submit form until data is checked
        e.stopPropagation()
        e.preventDefault()
        if( !this.tempPlaylist.name ) {
            this.setState({editNameError : true})
        }
        else {
            this.props.editPlaylist(this.props.playlist.id, this.tempPlaylist.name, this.tempPlaylist.comment, this.tempPlaylist.public)
            this.setState({showEditModal:false, editNameError : false})
        }
    }

    /* Deletion Modal */

    askDeletionConfirmation = () => {
        this.setState({showDeleteModal:true})
    }

    closeModalAndDelete = () => {
        this.waitingForDeletion = true
        this.setState({showDeleteModal:false})
        this.props.deletePlaylist( this.props.playlist )
    }

    closeDeleteModal = () => {
        this.setState({showDeleteModal:false})
    }

    render() {
        const playlist = this.props.playlist || { name:"", songCount:0, duration:0, isMine:false}
        const songs = this.props.songs
        const disableButton = this.state.selectedSongs && this.state.selectedSongs.length === 0
        const columnsToShow = playlist.isMine ? MINE_COLUMNS_TO_SHOW : NOT_MINE_COLUMNS_TO_SHOW
        return (
            <div style={{padding:"20px"}}>
                <div style={{ display:"flex", flexFlow: "row", marginBottom:"15px", marginTop:"15px"}}>
                    <div style={{flexGrow:1}}>
                        <h1 style={{color:"white", fontWeight:"bold"}}>
                            {playlist.isMine ? playlist.name : this.formatExternalPlaylistName(playlist.name) }
                            {playlist.isMine ?
                                <IconButton onClick={this.triggerEditModal} icon={<Icon icon="pencil" />} appearance="link" />
                                : null
                            }
                        </h1>
                        <span>{playlist.songCount} songs, {seconds_to_hhmmss(playlist.duration)} by <b>{playlist.owner}</b> </span>
                        { playlist.comment ?
                            <p>{`"${playlist.comment}"`}</p>
                            : null }
                    </div>
                    {playlist.isMine ?
                        <div style={{ display:"flex", flexFlow: "column"}}>
                            <Button color="red" onClick={this.askDeletionConfirmation} style={{marginBottom:"5px"}}>Delete playlist</Button>
                            <Button onClick={this.removeSelectedSongs} disabled={disableButton}>Remove from playlist</Button>
                        </div>
                        : null
                    }
                </div>
                <SongsTable songs={songs} onSongsSelected={this.onSongsSelected} columns={columnsToShow} />
                {/* Playlist deletion confirmation */}
                <Modal className="subplayer-modal" backdrop="static" show={this.state.showDeleteModal} onHide={this.closeDeleteModal} size="xs">
                    <Modal.Body>
                        <Icon icon="remind" style={{ color: '#ffb300', fontSize: 24 }} />
                        {'  '}
                        Once a playlist is deleted, it can't be recovered. Are you sure you want to proceed?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModalAndDelete} appearance="primary"> Ok </Button>
                        <Button onClick={this.closeDeleteModal} appearance="subtle"> Cancel </Button>
                    </Modal.Footer>
                </Modal>
                {/* Playlist edition form */}
                <Modal className="subplayer-modal" backdrop="static" show={this.state.showEditModal} onHide={this.closeEditModal} size="xs">
                    <Modal.Header>
                        <Modal.Title>Edit Playlist</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form fluid onSubmit={this.closeModalAndEdit}>
                            <FormGroup>
                                <ControlLabel>Name</ControlLabel>
                                <Input name="name" defaultValue={playlist.name} onChange={(value => {this.tempPlaylist.name = value})} style={{width:"100%"}} />
                                <span style={{color:"red", display:(this.state.editNameError ? "initial" : "none") }}>A name is required</span>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Comment</ControlLabel>
                                <Input name="comment" defaultValue={playlist.comment} style={{width:"100%"}} onChange={(value => {this.tempPlaylist.comment = value})} />
                            </FormGroup>
                            <FormGroup>
                                <Checkbox name="isPublic" defaultChecked={playlist.public} onChange={((value, checked) => {this.tempPlaylist.public = checked})}>Public</Checkbox>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" appearance="primary" onClick={this.closeModalAndEdit}> Save </Button>
                        <Button onClick={this.closeEditModal} appearance="subtle"> Cancel </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        "playlist" : state.playlists.byId[ownProps.playlistId],
        "songs" : state.playlists.currentPlaylist.songs
    }
}

const mapDispatchToProps = { removeSongsFromPlaylist, deletePlaylist, editPlaylist, loadSinglePlaylist }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist)