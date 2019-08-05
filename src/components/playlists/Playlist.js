import React from "react"
// Redux
import { connect } from "react-redux"
import { removeSongsFromPlaylist, loadSinglePlaylist } from "../../redux/actions/playlistsActions"
import { songsOfPlaylistSelector } from '../../redux/selectors/songSelectors'
// Utils
import { seconds_to_hhmmss } from "../../utils/formatting.js"
// UI
import SongsTable from '../songs/SongsTable'
import SongsTableEnhanced from '../songs/SongsTableEnhanced'
import DeletePlaylistModal from './DeletePlaylistModal/DeletePlaylistModal'
import EditPlaylistModal from './EditPlaylistModal/EditPlaylistModal'
import { Button, Icon, IconButton } from 'rsuite'

const NOT_MINE_COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.artist, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.download]
const MINE_COLUMNS_TO_SHOW = [...NOT_MINE_COLUMNS_TO_SHOW, SongsTable.columns.selectable]

class Playlist extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {selectedSongs : [], showDeleteModal : false, showEditModal : false}
        this.deletedIndexes = []
    }
    
    componentDidMount() {
        this.props.loadSinglePlaylist(this.props.playlistId)
    }

    componentDidUpdate(prevProps) {
        if( this.props.playlistId ) {
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
            this.props.removeSongsFromPlaylist( this.props.playlist, this.state.selectedSongs, selectedIndexes)
        }
    }

    formatExternalPlaylistName = (name) => {
        const regex = /^\[.*?\] /
        return name.replace(regex, "")
    }

    /* Edition modal */

    triggerEditModal = () => {
        this.setState({showEditModal:true})
    }

    closeEditModal = () => {
        this.setState({showEditModal:false})
    }

    /* Deletion Modal */

    askDeletionConfirmation = () => {
        this.setState({showDeleteModal:true})
    }

    closeDeleteModal = () => {
        this.setState({showDeleteModal:false})
    }

    render() {
        const playlist = this.props.playlist || { id:"", name:"", songCount:0, duration:0, isMine:false}
        const songs = this.props.songs
        const disableButton = this.state.selectedSongs && this.state.selectedSongs.length === 0
        const columnsToShow = playlist.isMine ? MINE_COLUMNS_TO_SHOW : NOT_MINE_COLUMNS_TO_SHOW
        return (
            <div style={{display:"flex", flexFlow:"column", padding:"20px", height:"100%", width:"100%"}}>
                <div style={{ display:"flex", flexFlow: "row", marginBottom:"15px"}}>
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
                <SongsTableEnhanced style={{flexGrow:1}} songs={songs} onSongsSelected={this.onSongsSelected} columns={columnsToShow} fixedHeightToFill={true} withPlaylistDropdown={false} sortable={true} />
                {/* Playlist deletion confirmation */}
                <DeletePlaylistModal playlistId={playlist.id} show={this.state.showDeleteModal} onHide={this.closeDeleteModal} />
                {/* Playlist edition form */}
                <EditPlaylistModal playlistId={playlist.id} show={this.state.showEditModal} onHide={this.closeEditModal} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        "playlist" : state.playlists.byId[ownProps.playlistId],
        "songs" : songsOfPlaylistSelector(state, ownProps)
    }
}

const mapDispatchToProps = { removeSongsFromPlaylist, loadSinglePlaylist }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist)