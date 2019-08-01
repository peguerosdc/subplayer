import React from "react";
import { connect } from "react-redux";
import subsonic from "../../api/subsonicApi";
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions";
import { beginAsyncTask, asyncTaskSuccess } from "../../redux/actions/apiStatusActions"
import { setStarOnSongs } from "../../redux/actions/songsActions";
// UI
import { Grid, Row, Col, Panel } from 'rsuite';
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
        this.props.beginAsyncTask()
        const album = await subsonic.getAlbum(id)
        this.setState({album : album})
        this.props.asyncTaskSuccess()
    }

    onPlaylistSelected = (playlist) => {
        this.props.addSongsToPlaylist(playlist, this.state.selectedSongs)
    }

    onFavouritesSelected = () => {
        this.props.setStarOnSongs(this.state.selectedSongs, true)
    }

    onSongsSelected = (selectedSongs) => {
        this.setState({selectedSongs: selectedSongs})
    }

    render() {
        const album = this.state.album
        const songs = (album && album.song) || []
        const disableDropdown = this.state.selectedSongs.length === 0
        console.log("Render album: "+album.name)
        // Render all
        return (
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
        )
    }
}

const mapDispatchToProps = { addSongsToPlaylist, beginAsyncTask, asyncTaskSuccess, setStarOnSongs }

export default connect(
    null,
    mapDispatchToProps
)(Album)