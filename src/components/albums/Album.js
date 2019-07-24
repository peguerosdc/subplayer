import React from "react";
import { connect } from "react-redux";
import subsonic from "../../api/subsonicApi";
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions";
// UI
import { FlexboxGrid, Panel } from 'rsuite';
import SongsTable from '../songs/SongsTable'
import PlaylistSelectorDropdown from '../common/PlaylistSelectorDropdown.js'

class Album extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { album : {}, selectedSongs : []}
    }

    async componentDidMount() {
        await this.loadAlbum(this.props.albumId)
    }

    loadAlbum = async (id) => {
        const album = await subsonic.getAlbum(id)
        this.setState({album : album})
    }

    onPlaylistSelected = (playlist) => {
        this.props.addSongsToPlaylist(playlist, this.state.selectedSongs)
    }

    onSongsSelected = (selectedSongs) => {
        this.setState({selectedSongs: selectedSongs})
    }

    render() {
        const album = this.state.album
        const songs = (album && album.song) || []
        const disableDropdown = this.state.selectedSongs.length === 0
        // Render all
        return (
            <Panel bordered style={{backgroundColor:"white"}}>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={6}>
                        <img src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : null} alt="Album Cover" width="100%" />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={18} style={{paddingLeft:"10px"}}>
                        <h2>{album ? album.name : "..."}</h2>
                        <PlaylistSelectorDropdown onPlaylistSelected={this.onPlaylistSelected} disabled={disableDropdown} />
                        <SongsTable songs={songs} columns={[SongsTable.columns.title, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.selectable]} onSongsSelected={this.onSongsSelected} />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
        )
    }
}

const mapDispatchToProps = { addSongsToPlaylist }

export default connect(
    null,
    mapDispatchToProps
)(Album)