import React from "react"
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { songsOfArtistSelector } from '../../../redux/selectors/songSelectors'
// UI
import SongsTableEnhanced from '../../songs/SongsTableEnhanced'
import SongsTable from '../../songs/SongsTable'

const COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.selectable, SongsTable.columns.download]

export function ArtistAllSongs(props) {
    const songs = props.songs
    return (
        <SongsTableEnhanced style={{...props.style, paddingTop: "15px"}} songs={songs} columns={COLUMNS_TO_SHOW} fixedHeightToFill={true} sortable={true} />
    )
}

ArtistAllSongs.propTypes = {
    style : PropTypes.object,
    songs : PropTypes.array,
}

ArtistAllSongs.defaultProps = {
    style : {},
    songs : [],
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