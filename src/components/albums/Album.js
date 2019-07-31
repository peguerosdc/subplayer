import React from "react";
import { connect } from "react-redux";
import subsonic from "../../api/subsonicApi";
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions";
import { beginApiCall, apiCallSuccess } from "../../redux/actions/apiStatusActions"
// UI
import { Grid, Row, Col, Panel, Alert } from 'rsuite';
import SongsTable from '../songs/SongsTable'
import PlaylistSelectorDropdown from '../common/PlaylistSelectorDropdown.js'
import "./Album.less"

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

    onFavouritesSelected = async () => {
        this.props.beginApiCall()
        // We need to remove the songs that are already starred before calling the API
        const songIds = this.state.selectedSongs.filter(song => !song.starred).map(song => song.id)
        const result = await subsonic.star(songIds)
        // Notify the user
        if( result ) {
            Alert.success(`${songIds.length} songs added to favourites!`)
        }
        this.props.apiCallSuccess()
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
            album.name ? (
                <Panel bordered className="album-card" style={{...this.props.style}}>
                    <Grid fluid>
                        <Row>
                            <Col smHidden xsHidden md={6} lg={6}>
                                <img src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : null} alt="Album Cover" width="100%" />
                            </Col>
                            <Col sm={24} md={18} style={{paddingLeft:"10px"}}>
                                <h2>
                                    <img className="rs-hidden-md rs-hidden-lg" src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : null} alt="Album Cover" width="45" height="45" />
                                    {album ? album.name : "..."}
                                </h2>
                                <PlaylistSelectorDropdown onPlaylistSelected={this.onPlaylistSelected} onFavouritesSelected={this.onFavouritesSelected} disabled={disableDropdown} />
                                <SongsTable songs={songs} columns={[SongsTable.columns.title, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.selectable, SongsTable.columns.download]} onSongsSelected={this.onSongsSelected} />
                            </Col>
                        </Row>
                    </Grid>
                </Panel>
                ) : null
        )
    }
}

const mapDispatchToProps = { addSongsToPlaylist, beginApiCall, apiCallSuccess }

export default connect(
    null,
    mapDispatchToProps
)(Album)