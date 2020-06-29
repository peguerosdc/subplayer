import React from "react"
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions"
import { addSongsToQueue } from "../../redux/actions/songsActions"
import { setStarOnSongs } from "../../redux/actions/favouritesActions"
// UI
import AutoSizer from 'react-virtualized-auto-sizer'
import SongsTable from './SongsTable'
import PlaylistSelectorDropdown from '../common/PlaylistSelectorDropdown/PlaylistSelectorDropdown'
import { SearchBar } from "../search/SearchBar"

export class SongsTableEnhanced extends React.Component {

    constructor(props) {
        super(props)
        this.state = { selectedSongs : [], filter : null }
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
        return (
            <div className={className} style={{...style, display:"flex", flexFlow:"column"}}>
                <div style={{display:"flex", flexFlow:"row"}}>
                    {showSearchFilter && <SearchBar id="searchBar" size="md" onSearch={this.onFilterSongs}/> }
                    {showPlaylistDropdown && <PlaylistSelectorDropdown id="playlistSelector" onQueueSelected={this.onQueueSelected} onPlaylistSelected={this.onPlaylistSelected} onFavouritesSelected={this.onFavouritesSelected} disabled={!hasSongsSelected} />}
                </div>
                {
                    rest.fixedHeightToFill ? (
                        <div style={{flexGrow:1}}>
                            <AutoSizer id="autosizerContainer" disableWidth>
                            {({height}) => (
                                <SongsTable id="songsTable" songsFilter={filterValue} height={height} onSongsSelected={this.onSongsSelected} {...rest} />
                            )}
                            </AutoSizer>
                        </div>
                    ) : ( <SongsTable id="songsTable" songsFilter={filterValue} onSongsSelected={this.onSongsSelected} {...rest} /> )
                }
            </div>
        )
    }

}

SongsTableEnhanced.propTypes = {
    withPlaylistDropdown : PropTypes.bool,
    withSearchFilter : PropTypes.bool,
    fixedHeightToFill : PropTypes.bool,
    addSongsToPlaylist : PropTypes.func,
    addSongsToQueue : PropTypes.func,
    setStarOnSongs : PropTypes.func
}

SongsTableEnhanced.defaultProps = {
    withPlaylistDropdown : true,
    withSearchFilter : true,
    fixedHeightToFill : false,
    addSongsToPlaylist: () => null,
    addSongsToQueue: () => null,
    setStarOnSongs: () => null,
}

const mapDispatchToProps = { addSongsToQueue, addSongsToPlaylist, setStarOnSongs }

export default connect(
    null,
    mapDispatchToProps
)(SongsTableEnhanced)
