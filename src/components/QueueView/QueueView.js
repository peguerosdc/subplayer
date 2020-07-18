import React from "react"
import PropTypes from 'prop-types'
// Utils
import { seconds_to_hhmmss } from "../../utils/formatting.js"
// UI
import "./QueueView.less"
import SongsTable from '../SongsTable/SongsTable'
import SongsList from '../SongsList'
import { Button, IconButton, Icon } from 'rsuite'
import ResponsiveTitle from '../ResponsiveTitle' 

const COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.artist, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.selectable, SongsTable.columns.download]

export default class QueueView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {selectedSongs : []}
    }

    onSongsSelected = (selectedSongs) => {
        this.setState({selectedSongs: selectedSongs})
    }

    removeSongsFromQueue = () => {
        this.props.removeSongsFromQueue && this.props.removeSongsFromQueue(this.state.selectedSongs)
    }

    clearQueue = () => {
        this.props.clearQueue && this.props.clearQueue()
    }

    onSongClicked = (song) => {
        this.props.seekToSongInQueue && this.props.seekToSongInQueue(song)
    }

    render() {
        const songs = this.props.songs
        const duration = songs.reduce( (accum, current) => accum + current.duration, 0 )
        const disableButton = this.state.selectedSongs && this.state.selectedSongs.length === 0
        return (
            <div style={{display:"flex", flexFlow:"column", height:"100%", width:"100%"}}>
                <div style={{ display:"flex", flexFlow: "row", padding:"20px 20px 15px 20px"}}>
                    <div style={{flexGrow:1}}>
                        <ResponsiveTitle>Playing Queue</ResponsiveTitle>
                        <p id="details">{songs.length} songs, {seconds_to_hhmmss(duration)}</p>
                    </div>
                    <div style={{ display:"flex", flexFlow: "column"}}>
                        <IconButton id="clear_button" onClick={this.clearQueue} style={{marginBottom:"5px"}} placement="right" icon={<Icon icon="trash"/>}>Clear</IconButton>
                        <Button id="remove_button" onClick={this.removeSongsFromQueue} disabled={disableButton}>Remove</Button>
                    </div>
                </div>
                <SongsList
                    id="songs_table"
                    className="queue-songs-container"
                    style={{flexGrow:1}}
                    songs={songs}
                    onSongsSelected={this.onSongsSelected}
                    columns={COLUMNS_TO_SHOW}
                    fixedHeightToFill={true}
                    withPlaylistDropdown={false}
                    withSearchFilter={false}
                    sortable={false}
                    showPlayButton={false}
                    onSongClicked={this.onSongClicked} />
            </div>
        )
    }
}

QueueView.propTypes = {
    songs : PropTypes.array,
    clearQueue : PropTypes.func,
    removeSongsFromQueue : PropTypes.func,
    seekToSongInQueue : PropTypes.func,
}

QueueView.defaultProps = {
    songs : [],
}
