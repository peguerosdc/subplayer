import React from "react";
// Redux
import { connect } from "react-redux";
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions";
import { setStarOnSongs } from "../../redux/actions/favouritesActions";
// UI
import AutoSizer from 'react-virtualized-auto-sizer'
import SongsTable from './SongsTable'
import PlaylistSelectorDropdown from '../common/PlaylistSelectorDropdown.js'
import { SearchBar } from "../search/SearchBar"

class SongsTableEnhanced extends React.Component {

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

    render() {
        const {style, ...rest} = this.props
        const hasSongsSelected = this.state.selectedSongs.length !== 0
        const showPlaylistDropdown = rest.withPlaylistDropdown
        const showSearchFilter = rest.withSearchFilter
        const filterValue = this.state.filter
        return (
            <div style={{backgroundColor:"white", padding:"5px", ...style, display:"flex", flexFlow:"column"}}>
                <div style={{display:"flex", flexFlow:"row"}}>
                    {showSearchFilter && <SearchBar size="md" style={{margin:"0px 10px"}} onSearch={this.onFilterSongs}/> }
                    {showPlaylistDropdown && <PlaylistSelectorDropdown onPlaylistSelected={this.onPlaylistSelected} onFavouritesSelected={this.onFavouritesSelected} disabled={!hasSongsSelected} />}
                </div>
                {
                    rest.fixedHeightToFill ? (
                        <div style={{flexGrow:1}}>
                            <AutoSizer disableWidth>
                            {({height}) => (
                                <SongsTable songsFilter={filterValue} height={height} onSongsSelected={this.onSongsSelected} {...rest} />
                            )}
                            </AutoSizer>
                        </div>
                    ) : (
                        <SongsTable songsFilter={filterValue} onSongsSelected={this.onSongsSelected} {...rest} />
                    )
                }
            </div>
        )
    }

}

SongsTableEnhanced.defaultProps = {
    withPlaylistDropdown : true,
    withSearchFilter : true,
    fixedHeightToFill : false,
}

const mapDispatchToProps = { addSongsToPlaylist, setStarOnSongs }

export default connect(
    null,
    mapDispatchToProps
)(SongsTableEnhanced)