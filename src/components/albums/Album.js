import React from "react";
import { connect } from "react-redux";
import subsonic from "../../api/subsonicApi";
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions";
import { setStarOnSongs } from "../../redux/actions/favouritesActions";
// Utils
import { makeGetSongsOfAlbum } from '../../redux/selectors/songSelectors'
// UI
import { Grid, Row, Col, Panel } from 'rsuite';
import SongsTable from '../songs/SongsTable'
import PlaylistSelectorDropdown from '../common/PlaylistSelectorDropdown.js'
import "./Album.less"

class Album extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { selectedSongs : []}
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
        const album = this.props.album || {}
        const songs = this.props.songs || []
        const disableDropdown = this.state.selectedSongs.length === 0
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

const mapStateToProps = (state, ownProps) => {
    const getSongsOfAlbum = makeGetSongsOfAlbum()
    return {
        "album" : state.albums.byId[ownProps.albumId],
        "songs" : getSongsOfAlbum(state, ownProps),
    }
}

const mapDispatchToProps = { addSongsToPlaylist, setStarOnSongs }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Album)