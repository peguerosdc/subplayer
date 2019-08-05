import React from "react";
// Redux
import { connect } from "react-redux";
import { songsOfArtistSelector } from '../../../redux/selectors/songSelectors'
import { addSongsToPlaylist } from "../../../redux/actions/playlistsActions";
import { setStarOnSongs } from "../../../redux/actions/favouritesActions";
// UI
import AutoSizer from 'react-virtualized-auto-sizer'
import SongsTable from '../../songs/SongsTable'
import PlaylistSelectorDropdown from '../../common/PlaylistSelectorDropdown.js'

const COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.selectable, SongsTable.columns.download]

class ArtistAllSongs extends React.Component {

    constructor(props) {
        super(props)
        this.state = { selectedSongs : [] }
    }

    // Add to favs and playlist
    onSongsSelected = (selectedSongs) => {
        this.setState({selectedSongs: selectedSongs})
    }

    onPlaylistSelected = (playlist) => {
        this.props.addSongsToPlaylist(playlist, this.state.selectedSongs)
    }

    onFavouritesSelected = () => {
        this.props.setStarOnSongs(this.state.selectedSongs, true)
    }

    render() {
        const songs = this.props.songs
        const hasSongsSelected = this.state.selectedSongs.length !== 0
        return (
            <div style={{...this.props.style, backgroundColor:"white", padding:"5px"}}>
                <div style={{display:"flex", flexFlow:"column", height:"100%", width:"100%"}}>
                    <PlaylistSelectorDropdown onPlaylistSelected={this.onPlaylistSelected} onFavouritesSelected={this.onFavouritesSelected} disabled={!hasSongsSelected} />
                    <div style={{flexGrow:1}}>
                        <AutoSizer disableWidth>
                        {({height}) => (
                            <SongsTable songs={songs} height={height} onSongsSelected={this.onSongsSelected} columns={COLUMNS_TO_SHOW} />
                        )}
                        </AutoSizer>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        songs: songsOfArtistSelector(state, props),
    }
}

const mapDispatchToProps = { addSongsToPlaylist, setStarOnSongs }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistAllSongs)