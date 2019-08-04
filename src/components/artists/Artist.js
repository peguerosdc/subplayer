import React from "react";
// Redux
import { connect } from "react-redux";
import { loadOneArtist } from "../../redux/actions/artistsActions"
import { songsOfArtistSelector } from '../../redux/selectors/songSelectors'
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions";
import { setStarOnSongs } from "../../redux/actions/favouritesActions";
// UI
import AutoSizer from 'react-virtualized-auto-sizer'
import SongsTable from '../songs/SongsTable'
import PlaylistSelectorDropdown from '../common/PlaylistSelectorDropdown.js'

const COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.selectable, SongsTable.columns.download]

class Artist extends React.Component {

    constructor(props) {
        super(props)
        this.state = { selectedSongs : [] }
    }

    componentDidMount() {
        this.props.loadOneArtist(this.props.artistId)
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
        const artist = this.props.artist || {}
        const songs = this.props.songs
        const hasSongsSelected = this.state.selectedSongs.length !== 0
        return (
            <div style={{display:"flex", flexFlow:"column", padding:"20px", height:"100%", width:"100%"}}>
                <h1 style={{color:"white", fontWeight: "bold"}}>{artist != null ? artist.name : "..."}</h1>
                <PlaylistSelectorDropdown onPlaylistSelected={this.onPlaylistSelected} onFavouritesSelected={this.onFavouritesSelected} disabled={!hasSongsSelected} />
                <div style={{flexGrow:1}}>
                    <AutoSizer disableWidth>
                    {({height}) => (
                        <SongsTable songs={songs} height={height} onSongsSelected={this.onSongsSelected} columns={COLUMNS_TO_SHOW} />
                    )}
                    </AutoSizer>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        artist : state.artists.byId[props.artistId],
        songs: songsOfArtistSelector(state, props),
    }
}

const mapDispatchToProps = { loadOneArtist, addSongsToPlaylist, setStarOnSongs }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Artist)