import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
// UI
import SongsTable from '../SongsTable/SongsTable'
import SongsTableEnhanced from '../SongsTableEnhanced'

const COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.artist, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.download, SongsTable.columns.selectable]

export default function GenreSongs(props) {
    const { genre, loadSongsOfGenre, songs, ...rest } = props

    useEffect(()=> {
        if( genre !== null) {
            loadSongsOfGenre(genre)
        }
    }, [genre, loadSongsOfGenre])

    return (
        <SongsTableEnhanced {...rest} songs={songs} columns={COLUMNS_TO_SHOW} fixedHeightToFill={true} withPlaylistDropdown={true} sortable={true} />
    )
}

GenreSongs.propTypes = {
    genre: PropTypes.object,
    loadSongsOfGenre: PropTypes.func,
    songs : PropTypes.array,
}

GenreSongs.defaultProps = {
    genre: null,
    loadSongsOfGenre: () => null,
    songs: []
}
