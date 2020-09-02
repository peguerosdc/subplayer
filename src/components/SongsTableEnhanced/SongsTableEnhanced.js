import React from "react"
import PropTypes from 'prop-types'
// UI
import AutoSizer from 'react-virtualized-auto-sizer'
import SongsTable from '../SongsTable'
import PlaylistSelectorDropdown from '../PlaylistSelectorDropdown'
import SearchBar from "../SearchBar/SearchBar"
import { Button } from 'rsuite'

export default class SongsTableEnhanced extends React.Component {

    constructor(props) {
        super(props)
        this.state = { selectedSongs : [], filter : null }
        this.songs = props.songs
    }

    componentDidUpdate(prevProps) {
        this.songs = this.props.songs
    }

    // Store new order of songs
    onSongsSorted = (songs) => {
        this.songs = songs
    }

    // Play all songs
    playAll = () => {
        this.songs && this.props.playAllSongs(this.songs)
    }

    // Add option to filter songs
    onFilterSongs = (query) => {
        const fixedValue = query ? query : null
        this.setState({filter : fixedValue})
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

    onQueueSelected = () => {
        this.props.addSongsToQueue(this.state.selectedSongs)
    }

    render() {
        const {style, className, ...rest} = this.props
        const hasSongsSelected = this.state.selectedSongs.length !== 0
        const showPlaylistDropdown = rest.withPlaylistDropdown
        const showSearchFilter = rest.withSearchFilter
        const filterValue = this.state.filter
        const showPlayButton = rest.showPlayButton
        return (
            <div className={className} style={{...style, display:"flex", flexFlow:"column"}}>
                <div style={{display:"flex", flexFlow:"row", width:"100%"}}>
                    {showPlayButton && <Button id="playAll" onClick={this.playAll} appearance="ghost">PLAY</Button>}
                    {showSearchFilter && <SearchBar style={{display:'flex', flex:1}} id="searchBar" size="md" onSearch={this.onFilterSongs}/> }
                    {showPlaylistDropdown && <PlaylistSelectorDropdown id="playlistSelector" onQueueSelected={this.onQueueSelected} onPlaylistSelected={this.onPlaylistSelected} onFavouritesSelected={this.onFavouritesSelected} disabled={!hasSongsSelected} />}
                </div>
                {
                    rest.fixedHeightToFill ? (
                        <div style={{flexGrow:1}}>
                            <AutoSizer id="autosizerContainer" disableWidth>
                            {({height}) => (
                                <SongsTable id="songsTable" songsFilter={filterValue} height={height} onSongsSelected={this.onSongsSelected} onSongsSorted={this.onSongsSorted} {...rest} />
                            )}
                            </AutoSizer>
                        </div>
                    ) : ( <SongsTable id="songsTable" songsFilter={filterValue} onSongsSelected={this.onSongsSelected} onSongsSorted={this.onSongsSorted} {...rest} /> )
                }
            </div>
        )
    }

}

SongsTableEnhanced.propTypes = {
    withPlaylistDropdown : PropTypes.bool,
    withSearchFilter : PropTypes.bool,
    fixedHeightToFill : PropTypes.bool,
    showPlayButton : PropTypes.bool,
    addSongsToPlaylist : PropTypes.func,
    addSongsToQueue : PropTypes.func,
    setStarOnSongs : PropTypes.func,
    playAllSongs : PropTypes.func,
}

SongsTableEnhanced.defaultProps = {
    withPlaylistDropdown : true,
    withSearchFilter : true,
    fixedHeightToFill : false,
    showPlayButton : true,
    addSongsToPlaylist: () => null,
    addSongsToQueue: () => null,
    setStarOnSongs: () => null,
    playAllSongs: () => null,
}
