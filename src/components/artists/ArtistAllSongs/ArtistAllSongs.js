import React from "react";
// Redux
import { connect } from "react-redux";
import { songsOfArtistSelector } from '../../../redux/selectors/songSelectors'
// UI
import SongsTableEnhanced from '../../songs/SongsTableEnhanced'
import SongsTable from '../../songs/SongsTable'

const COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.selectable, SongsTable.columns.download]

class ArtistAllSongs extends React.Component {

    constructor(props) {
        super(props)
        this.state = { selectedSongs : [] }
    }

    render() {
        const songs = this.props.songs
        return (
            <SongsTableEnhanced style={{...this.props.style}} songs={songs} columns={COLUMNS_TO_SHOW} fixedHeightToFill={true} sortable={true} />
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        songs: songsOfArtistSelector(state, props),
    }
}

export default connect(
    mapStateToProps,
    null
)(ArtistAllSongs)