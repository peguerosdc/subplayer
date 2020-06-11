import React from "react"
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { clearQueue, removeSongsFromQueue, seekToSongInQueue  } from "../../redux/actions/songsActions"
import { getSongsInQueueSelector } from '../../redux/selectors/musicPlayerSelector'
// Utils
import { seconds_to_hhmmss } from "../../utils/formatting.js"
// UI
import SongsTable from '../songs/SongsTable'
import SongsTableEnhanced from '../songs/SongsTableEnhanced'
import { Button } from 'rsuite'

const COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.artist, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.selectable, SongsTable.columns.download]

export class Queue extends React.Component {

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
        this.props.seekToSongInQueue(song)
    }

    render() {
        const songs = this.props.songs
        const duration = songs.reduce( (accum, current) => accum + current.duration, 0 )
        const disableButton = this.state.selectedSongs && this.state.selectedSongs.length === 0
        return (
            <div style={{display:"flex", flexFlow:"column", padding:"20px", height:"100%", width:"100%"}}>
                <div style={{ display:"flex", flexFlow: "row", marginBottom:"15px"}}>
                    <div style={{flexGrow:1}}>
                        <h1 style={{color:"white", fontWeight:"bold", display: "inline-block"}}>Playing Queue</h1>
                        <p id="details">{songs.length} songs, {seconds_to_hhmmss(duration)}</p>
                    </div>
                    <div style={{ display:"flex", flexFlow: "column"}}>
                        <Button id="clearButton" onClick={this.clearQueue} style={{marginBottom:"5px"}}>Clear</Button>
                        <Button id="removeButton" onClick={this.removeSongsFromQueue} disabled={disableButton}>Remove</Button>
                    </div>
                </div>
                <SongsTableEnhanced
                    id="songsComponent"
                    style={{flexGrow:1}}
                    songs={songs}
                    onSongsSelected={this.onSongsSelected}
                    columns={COLUMNS_TO_SHOW}
                    fixedHeightToFill={true}
                    withPlaylistDropdown={false}
                    withSearchFilter={false}
                    sortable={false}
                    onSongClicked={this.onSongClicked} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        "songs" : getSongsInQueueSelector(state, ownProps)
    }
}

const mapDispatchToProps = { clearQueue, removeSongsFromQueue, seekToSongInQueue }

Queue.propTypes = {
    songs : PropTypes.array,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Queue)