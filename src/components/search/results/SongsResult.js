import React from 'react'
import PropTypes from 'prop-types'
// UI
import SongsTable from '../../songs/SongsTable'
import SongsTableEnhanced from '../../songs/SongsTableEnhanced'

const SONG_COLUMNS_TO_SHOW = [SongsTable.columns.selectable, SongsTable.columns.title, SongsTable.columns.artist, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.download]

export function SongsResult(props) {
    const songs = props.songs
    return (
        <SongsTableEnhanced style={{marginBottom:"20px"}} songs={songs} columns={SONG_COLUMNS_TO_SHOW} sortable={true} />
    )
}

SongsResult.propTypes = {
    songs : PropTypes.array.isRequired
}