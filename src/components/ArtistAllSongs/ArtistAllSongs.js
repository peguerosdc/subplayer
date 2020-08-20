import React from "react"
import PropTypes from 'prop-types'
// UI
import SongsTableEnhanced from '../SongsTableEnhanced'
import SongsTable from '../SongsTable/SongsTable'

const COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.selectable, SongsTable.columns.download]

export default function ArtistAllSongs(props) {
    const songs = props.songs
    return (
        <SongsTableEnhanced style={{...props.style, padding:"0px 15px 15px"}} songs={songs} columns={COLUMNS_TO_SHOW} fixedHeightToFill={true} sortable={true} />
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
